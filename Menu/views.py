from django.shortcuts import render
import matplotlib.pyplot as plt
import re

def Triangular(F,ax,Test):

    l = [0.0 if x <= F[0] else ((x - F[0])/(F[1]-F[0])) if (F[0] <= x) and (x <= F[1]) else ((F[2]-x)/(F[2]-F[1]))if (F[1] <= x) and (x <= F[2]) else 0.0 for x in [x for x in range(F[0]-2,F[2]+2)]]
    ax.plot([x for x in range(F[0]-2,F[2]+2)],l,'c')
    ax.plot([F[1],F[1]],[0,1],'--r')

def trapezoidal(F,ax,Test):

    l = [0.0 if x <= F[0] else ((x - F[0])/(F[1]-F[0])) if (F[0] <= x) and (x <= F[1]) else ((F[3]-x)/(F[3]-F[2]))if (F[2] <= x) and (x <= F[3]) else 1.0 if F[1] <= x and x <= F[2] else 0.0 for x in [x for x in range(F[0]-2,F[3]+2)]]
    ax.plot([x for x in range(F[0]-2,F[3]+2)],l,'c')
    ax.plot([F[1],F[1]],[0,1],'--r')
    ax.plot([F[2],F[2]],[0,1],'--r')

def LogicaDif(request):
    global F,G,Modo


    fig = plt.figure(figsize=(15,8))
    ax_2 = fig.add_subplot(221)
    ax_3 = fig.add_subplot(223)
    ax = fig.add_subplot(122)

    EdadManejo = [0,0]

    ax_2.set_title('Edad')
    
    trapezoidal([17,18,25,30],ax_2,EdadManejo[0])
    Triangular([20,35,50],ax_2,EdadManejo[0])
    trapezoidal([40,60,70,80],ax_2,EdadManejo[0])

    ax_3.set_title('%' + 'Manejo')
    
    trapezoidal([-1,0,10,20],ax_3,EdadManejo[0])
    Triangular([10,40,60],ax_3,EdadManejo[0])
    trapezoidal([50,70,100,110],ax_3,EdadManejo[0])

    ax.set_title('%' + 'Riesgo Financiero')
    
    trapezoidal([-1,0,10,20],ax,0)
    Triangular([10,30,45],ax,0)
    trapezoidal([40,55,100,110],ax,0)

    plt.savefig('./static/imagenes/Logica/base.png')
    return render(request,'Logica.html')

# Create your views here.
def Menu(request):
    return render(request,'home.html')


def Home(request):
    return render(request,'main.html')