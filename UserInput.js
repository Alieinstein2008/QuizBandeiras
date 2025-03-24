
import './UserInput.css'
export default function UserInput({ idInput, textoInput, onChangeInput,resposta,nome,addEvent }){
    return (
        <>
            <div className='frameInput' >
                <input 
                autoComplete='off'
                id={idInput} 
                type='text' 
                placeholder={textoInput}
                onChange={(e) => onChangeInput(e.target.value)}
                onKeyUp={(x)=>addEvent(x.keyCode)}
                
                       
            />
            {resposta === '404' && <div style={{color:'white', textAlign:'center'}}>Digite um país válido</div> }
            {resposta === 'certa' && <div style={{color:'green', textAlign:'center', border:'2px double green', borderRadius:'15px' }}>{nome}</div> }
            {resposta === 'errada' && <div style={{color:'white', textAlign:'center', borderRadius:'15px'}}>{nome}</div> }
            </div>
            
        </>
    )
}