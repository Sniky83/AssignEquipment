import { useCookies } from 'react-cookie';
import NavBar from '../navbar/navbar';
import Footer from '../footer/footer';
import Body from '../body/body';
import './site.css';

export default function Container() {
    const [cookies] = useCookies();

    return(
        <>
            {cookies.token && <NavBar/>}
                <Body/>
            {cookies.token && <Footer/>}
        </>
    );
}