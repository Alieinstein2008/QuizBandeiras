import './Quiz.css';
import FrameBandeira from './FrameBandeira';
import FramePontuacao from './FramePontuacao';
import { useEffect, useState } from "react";
import UserInput from './UserInput';


export default function Quiz(){
    const [paises,setPaises] = useState([])
    const [acertos, setAcertos] = useState(0);
    const [erros, setErros] = useState(0);
    const [bandeira,setBandeira] = useState('');
    const [legenda, setLegenda] = useState('');
    const [nomePais, setNomePais] = useState('');
    const [inputUsuario, setInputUsuario] = useState('');
    const [tecla,setTecla] = useState()
    const [chute, setChute] = useState('')
    const [resposta,setResposta] = useState()
    const [corBorda,setCorBorda] = useState('#253745')
    const [corBack, setCorBack] = useState('#11212d')
    const [estadoAnimacao, setEstadoAnimacao] = useState('paused')

    function sorteador(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    function sortearBandeira(){
        if(paises.length > 0){
            let paisSorteado = paises[sorteador(0,paises.length)];
            setBandeira(paisSorteado["bandeira"])
            setLegenda(paisSorteado["legenda"])
            setNomePais(paisSorteado["nome"])
           
        }
        
    }
   

    

    function Pais(nome, bandeira, legenda) {
        this.nome = nome;
        this.bandeira = bandeira;
        this.legenda = legenda;
    }
    function carregarPaises(){
        var paisesCarregados = []
        const url = 'https://restcountries.com/v3.1/all?fields=flags,name';
        fetch(url)
        .then(resposta => resposta.json())
        .then(obj => {
            for(let i = 0; i < obj.length; i++){
                let target = obj[i];
                for(let key in target){
                    let alvo = target[key];
                    for(let chave in alvo){
                        switch (chave) {
                            case "png":
                                var flagAtual = alvo[chave];
                                break;
                            case "common":
                                var nomeAtual = alvo[chave];
                                break;
                            case "alt":
                                var legendaAtual = alvo[chave];
                                break;
                            default:
                                break;
                        }
                        
                    }
               
                }
            let novoPais = new Pais(nomeAtual,flagAtual,legendaAtual) ;
            paisesCarregados.push(novoPais);      
            }
          
            
     
    })
    
    .finally(()=>{
        setPaises(paisesCarregados)
       
    })
   
    
    }

    function pontuacao(btn){
        switch (btn) {
            case 'green':
                let url = `https://restcountries.com/v3.1/translation/${inputUsuario}?fields=flags`
                fetch(url)
                .then(response => response.json())
                .then(obj => {
                    if(obj.hasOwnProperty("status") && obj["status"] === 404){
                        setResposta('404')
                        setTimeout(() => {
                            setResposta('')
                        }, 2000);

                    }else{
                        for(let i=0 ; i < obj.length ; i++){
                            let target = obj[i]
                            for(let key in target){
                              let alvo = target[key];
                              alvo = alvo["png"];
                              setChute(alvo);
                               
                                
                            }  
                          }
                    
        }})
                
                

                break;
            case 'red':
                setAcertos(0);
                setErros(0);
                sortearBandeira();
                break;
            default:
                break;
        }

    }
    

    
    
    
    useEffect((carregarPaises),[]);
    useEffect(()=>{
        sortearBandeira()
    },[paises])

    useEffect(()=>{
        if(chute !== '' && bandeira !== ''){
            if(chute === bandeira){
                setResposta('certa')
                let pontuacao = acertos
                pontuacao++;
                setAcertos(pontuacao);
                setCorBack('#00ff15')
                setCorBorda('green')
                setTimeout(() => {
                    setCorBack('#11212d')
                    setCorBorda('#253745')
                    setResposta('')
                }, 2000);
                    
                
            }else{
                let pontuacao = erros;
                pontuacao++;
                setErros(pontuacao);
                setCorBack('#ff0000')
                setCorBorda('white')
                setResposta('errada') 
                setTimeout(() => {
                    setResposta('')
                    setCorBack('#11212d')
                    setCorBorda('#253745')
                    
                }, 2000);
                
            
            }
            setTimeout(() => {
                sortearBandeira()
            }, 2000);
            
            
        }
        setChute('');
      

        
                     
        
    },[chute])
    useEffect(()=>{
        if(tecla === 13){
            pontuacao('green')
        }
        setTecla()
    
   },[tecla])
    return(

        <div className="Quiz" on >
            <div id='divTitulo'>Qual é o nome da Bandeira ?</div>
                          

            <FramePontuacao acertos={acertos} erros={erros} background={corBack} border={corBorda}></FramePontuacao>
            <FrameBandeira paises = {paises} bandeira={bandeira} nomePais={nomePais} legenda={legenda} ></FrameBandeira>
            <UserInput
                idInput='inputUsuario'
                textoInput={'Digite o nome do país'}
                onChangeInput={setInputUsuario}
                border={corBorda}
                background={corBack}
                resposta={resposta}
                nome={nomePais}
                addEvent={setTecla}
                animationPlayState={estadoAnimacao}
                
             />
             
           
            
            <div className='frameButtons'>
                
                <button id='btngreen' onClick={() => pontuacao('green')}>Próximo</button>
                <button id='btnred' onClick={() => pontuacao('red')} >Reiniciar</button>
                
            </div>
        </div>
     
    );
}