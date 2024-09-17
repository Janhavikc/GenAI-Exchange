import * as React from 'react';
import Input from './Input';
import dummyImage from '../assets/unsplash.jpg';
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from './Spinner';

const ImageSelection = ({setImage, canvas}) =>{
    const {getAccessTokenSilently} = useAuth0();
    const [productName, setProductName] = React.useState("");
    const [discount, setDiscount] = React.useState("");
    const [theme, setTheme] = React.useState("");
    const [userToken, setUserToken] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [resImages, setResImages] = React.useState();
    
    React.useEffect(()=>{
        const getToken=async()=>{
            const token = await getAccessTokenSilently({
                authorizationParams:{
                    audience:'https://dev-zhqru81kwfzddklq.jp.auth0.com/api/v2/'
                }
            });
            setUserToken(token);
            return token;
        }
        getToken();
    }, [])

    const submitSearch = ()=>{
        if(userToken && productName && canvas.width && canvas.height){
            setLoading(true);
            const urlsToFetch = [
                `http://${window.location.hostname}:5000/imagen`,
                `http://${window.location.hostname}:5000/imagen`,
                `http://${window.location.hostname}:5000/imagen`,
                `http://${window.location.hostname}:5000/imagen`
            ];
            
            const fetchPromises = urlsToFetch.map(url => 
                fetch(url, {
                    method:'POST',
                    body:JSON.stringify({
                        'search':productName,
                        'theme':theme,
                        'discount':discount,
                        'width':canvas.width,
                        'height':canvas.height
                    }),
                    headers: {
                        'Authorization': 'Bearer ' + userToken,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.blob())
            );
            
            Promise.all(fetchPromises)
                .then(responses => {
                    const responseData = responses.map(response => response);
                    // if(e.target.files.length !== 0){
                    //     this.setState({image: URL.createObjectURL(e.target.files[0])})
                    //   }
                    // const url = URL.createObjectURL(responseData);
                    // console.log(url);
                    const url = responseData.map(i=>URL.createObjectURL(i));
                    setResImages(url);
                })
                .catch(error => console.error('Error fetching data:', error))
                .finally(()=>setLoading(false));
        }
    }

    return<>
        <div className='ImageSelection bg-zinc-900' style={{width:'13rem'}}>
            <h5>Images Preview</h5>
            <hr/>
            <div className='m-2 text-left'>
                <Input label={'Product name'} value={productName} onChange={(e)=>setProductName(e.target.value)}/>
                <Input label={'Discount (optional)'} value={discount} onChange={(e)=>setDiscount(e.target.value)}/>
                <Input label={'Theme (optional)'} value={theme} onChange={(e)=>setTheme(e.target.value)}/>
                <div className='text-sm text-zinc-200' style={{fontSize:'8px', fontStyle:'italic'}}>Eg., Diwali, Independence Day..etc</div>
            </div>
            <button onClick={submitSearch} className='py-2 px-3 items-center gap-x-2 text-sm font-medium rounded-lg border border-[#9ef01a] bg-[#9ef01a] text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none'>Search</button>
            <div className='relative'>
            {loading && <Spinner/>}
            {!loading && resImages && <div className='flex justify-around mt-5 flex-wrap'>
                
                {resImages.map((img, idx)=><>
                    <img className='mb-5' id={'select-image-'+(idx+1)} onClick={()=>setImage('select-image-'+(idx+1))} src={img} alt={dummyImage} width={75} height={75}/>
                
                </>)}
                
            </div>}
            </div>
            
        </div>
    </>
};

export default ImageSelection;