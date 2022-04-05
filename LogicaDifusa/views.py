from typing import Text
from django.shortcuts import render
import matplotlib.pyplot as plt
import re

def Triangular(F,ax,Test):

    Tf = [Test]
    l = [0.0 if x <= F[0] else ((x - F[0])/(F[1]-F[0])) if (F[0] <= x) and (x <= F[1]) else ((F[2]-x)/(F[2]-F[1]))if (F[1] <= x) and (x <= F[2]) else 0.0 for x in [x for x in range(F[0]-2,F[2]+2)]]
    T = [0.0 if x <= F[0] else ((x - F[0])/(F[1]-F[0])) if (F[0] <= x) and (x <= F[1]) else ((F[2]-x)/(F[2]-F[1]))if (F[1] <= x) and (x <= F[2]) else 0.0 for x in Tf]
    ax.plot([x for x in range(F[0]-2,F[2]+2)],l,'c')
    ax.plot([F[1],F[1]],[0,1],'--r')
    if(Tf[0]!=0 and T[0]!=0):
        ax.plot(Test,T,'o',color = 'tab:red',label='El valor en el punto es = ' + "{:.2f}".format(T[0]))
        ax.plot([Tf[0],Tf[0]],[0,T[0]],'--g')
        ax.plot([F[0],Tf[0]],[T[0],T[0]],'--g')
        f.append([Test,T[0]])

def trapezoidal(F,ax,Test):

    Tf = [Test]
    l = [0.0 if x <= F[0] else ((x - F[0])/(F[1]-F[0])) if (F[0] <= x) and (x <= F[1]) else ((F[3]-x)/(F[3]-F[2]))if (F[2] <= x) and (x <= F[3]) else 1.0 if F[1] <= x and x <= F[2] else 0.0 for x in [x for x in range(F[0]-2,F[3]+2)]]
    T = [0.0 if x <= F[0] else ((x - F[0])/(F[1]-F[0])) if (F[0] <= x) and (x <= F[1]) else ((F[3]-x)/(F[3]-F[2]))if (F[2] <= x) and (x <= F[3]) else 1.0 if F[1] <= x and x <= F[2] else 0.0 for x in Tf]
    ax.plot([x for x in range(F[0]-2,F[3]+2)],l,'c')
    ax.plot([F[1],F[1]],[0,1],'--r')
    ax.plot([F[2],F[2]],[0,1],'--r')
    if(Tf[0]!=0 and T[0]!=0):    
        ax.plot(Test,T,'o',color = 'tab:red',label='El valor en el punto es = ' + "{:.2f}".format(T[0]))
        ax.plot([Tf[0],Tf[0]],[0,T[0]],'--g')
        ax.plot([F[0],Tf[0]],[T[0],T[0]],'--g')
        f.append([Test,T[0]])

def g(request):
    global F,G,Modo,f

    f = []

    fig = plt.figure(figsize=(15,8))
    ax_2 = fig.add_subplot(221)
    ax_3 = fig.add_subplot(223)
    ax = fig.add_subplot(122)

    Texto = 0
    if request.method == 'GET':
        Texto = str(request.GET.get('CV'))
        print(Texto)

    #Entrada = [ x for x in open('Examen.txt',encoding='utf8').read().split(' ') if len(re.findall(r'[A-Z]',x)) != 0]

    EdadManejo = [int(re.search(r'[0-9]+[0-9]', Texto).group()) if len(re.findall(r'[0-9]+', Texto)) and x == 0 else re.search(r'[0-9]+%', Texto).group() if len(re.findall(r'[0-9]+%', Texto)) and x == 1 else x for x in range(2)]
    print(EdadManejo)

    ax_2.set_title('Edad')
    
    trapezoidal([17,18,25,30],ax_2,EdadManejo[0])
    Triangular([20,35,50],ax_2,EdadManejo[0])
    trapezoidal([40,60,70,80],ax_2,EdadManejo[0])
    edad = f
    f = []

    ax_3.set_title('%' + 'Manejo')
    
    trapezoidal([-1,0,10,20],ax_3,int(re.search(r'[0-9]+',EdadManejo[1]).group()))
    Triangular([10,40,60],ax_3,int(re.search(r'[0-9]+',EdadManejo[1]).group()))
    trapezoidal([50,70,100,110],ax_3,int(re.search(r'[0-9]+',EdadManejo[1]).group()))
    manejo = f
    f = []

    ax.set_title('%' + 'Riesgo Financiero')
    
    trapezoidal([-1,0,10,20],ax,0)
    Triangular([10,30,45],ax,0)
    trapezoidal([40,55,100,110],ax,0)

    print(edad,manejo)
    plt.savefig('./static/imagenes/Logica/base.png')
    return render(request,'Logica.html')