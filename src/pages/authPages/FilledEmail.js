import EnvData from '../../config/EnvData';
import './MailAlert.css'

function FilledEmail({checkResponseMsg, setModal}) {
    return (
        <div className="App">
          <div class="container">
            <div class="wyre_logo"> <img src="/images/Group 1.png" alt="" srcset="" /></div>
            <div class="emoji"><img src="/images/failed_entry_1.png" alt="" srcset="" /></div>
            <div class="text">
            <h1>Oops!</h1>
            <p className='response_message'>{checkResponseMsg}</p>
            <div class="button_section">
                <button class="button_1" onClick={() => setModal(false)}>Go back</button>
                <button class="button_2"><a href={EnvData.REACT_APP_DASHBOARD_LINK}>Sign in</a></button>
            </div>
          </div>       
        </div>
        </div>
    )
}

export default FilledEmail;