import './welcome.css';
import Logo from '../../../src/logo.jpeg';
import { NavBar } from '../NavBar/navBar';

export function Welcome() {
    return (
        <section className='welcome'>
            <section className='title'>
                    {/* <h1 className='marketTitle'>M A R K E T</h1> */}
                    
                    <NavBar />
                    <img className='poza' src={Logo}/>
            </section>
            <section className='pictures'>

            </section>
        </section>
    )
}