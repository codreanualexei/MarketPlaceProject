import './welcome.css';
import Logo from '../../../src/logo.jpeg';
import { NavBar } from '../NavBar/navBar';
import Zoom from 'react-reveal/Zoom';
import c1r1 from '../../marketPhotos/c1r1.jpg';
import c1r21 from '../../marketPhotos/c1r21.jpg';
import c1r22 from '../../marketPhotos/c1r22.jpg';
import c2 from '../../marketPhotos/c2.jpg';
import c3r2 from '../../marketPhotos/c3r2.jpg';
import c3r11 from '../../marketPhotos/c3r11.jpg';
import c3r12 from '../../marketPhotos/c3r12.jpg';
import Roll from 'react-reveal/Roll';
import Rotate from 'react-reveal/Rotate';
import Bounce from 'react-reveal/Bounce';

export function Welcome() {
    return (
        <section className='welcome'>
            <section className='title'>
                    {/* <h1 className='marketTitle'>M A R K E T</h1> */}
                    
                    <NavBar />
                    <img className='poza' src={Logo}/>
            </section>
            <section className='pictures'>
                <section className='column1'>
                    <section className='c1r1'>
                    <Zoom top left>
                        <img className='type1' src={c1r1}/>
                    </Zoom>
                    </section>
                    <section className='c1r2'>
                    <Bounce left>
                        <img className='type21' src={c1r21}/>
                        <img className='type22' src={c1r22}/>
                    </Bounce>
                    </section>
                </section>
                <section className='column2'>
                    <Roll left>
                        <img className='type3' src={c2}/>
                    </Roll>
                </section>
                <section className='column3'>
                    <section className='c3r1'>
                        <Bounce right>
                        <img className='type21' src={c3r11}/>
                        <img className='type22' src={c3r12}/>
                        </Bounce>
                    </section>
                    <section className='c3r2'>
                        <Zoom bottom right>
                        <img className='type1' src={c3r2}/>
                        </Zoom>
                    </section>
                </section>

            </section>
        </section>
    )
}