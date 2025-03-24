import './FrameBandeira.css'


export default function FrameBandeira({bandeira,legenda}){
   
  
   
    
    return(
        <div className='frameBandeira' >
                  
            <img src={bandeira} alt={legenda}></img>
    
        </div>
    )
}