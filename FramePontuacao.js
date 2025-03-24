import './FramePontuacao.css'
export default function FramePontuacao({acertos,erros,background,border}){
    
    return(
        <div className='framePontuacao' style={{backgroundColor:background, borderColor:border}}>
                
                <p id='insertAcertos'>Acertos : {acertos} </p>
                <p id='insertErros'>Erros : {erros}</p>
            
        </div>
    )
    
}