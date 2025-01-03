import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage(){
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(100);

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/' + id)
            .then(response => {
                const {data} = response;
                setTitle(data.title);
                setAddress(data.address);
                setAddedPhotos(data.photos);
                setDescription(data.description);
                setPerks(data.perks);
                setExtraInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuests(data.maxGuests);
                setPrice(data.price);
            })
    }, [id]);

    function inputHeader(text) {
        return (
            <h2 className="mt-4 text-2xl">{text}</h2>
        )
    }

    function inputDescription(text) {
        return (
            <p className="text-sm text-gray-500">{text}</p>
        )
    }

    function preInput(header, description){
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        )
    }

    async function savePlace(ev){
        ev.preventDefault();
        const placeData ={ 
            title, 
            address, 
            description, 
            addedPhotos,
            perks, 
            extraInfo, 
            checkIn, 
            checkOut, 
            maxGuests,
            price
        };
        if(id){ 
            //update
            await axios.put('/places', {
               id, ...placeData
            });
            setRedirect(true);
        }
        else{
            //create
            await axios.post('/places', 
                placeData
            );
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'} />;
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
                <input value={title} 
                        onChange={ev => setTitle(ev.target.value)} 
                        type="text" 
                        placeholder="title, for example: My lovely apartment" />
                {preInput('Address', 'Address to this place')}
                <input value={address} 
                        onChange={ev => setAddress(ev.target.value)} 
                        type="text" 
                        placeholder="address" />
                {preInput('Photos', 'More = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                {preInput('Description','Description of the place')}
                <textarea value={description} 
                        onChange={ev => setDescription(ev.target.value)}/>
                {preInput('Perks','Select all the perks of your place')}
                <div className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks}/>
                </div>
                {preInput('Extra','House rules, etc')}
                <textarea value={extraInfo} 
                        onChange={ev => setExtraInfo(ev.target.value)}/>
                {preInput('Check in & out times','Add check in and out times, remember to have some time for cleaning the rooms between guests')}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1 ">Check in time</h3>
                        <input value={checkIn} 
                                onChange={ev => setCheckIn(ev.target.value)} 
                                type="text" 
                                placeholder="11:11"/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1 ">Check out time</h3>
                        <input type="text" 
                                value={checkOut} 
                                onChange={ev => setCheckOut(ev.target.value)} 
                                placeholder="12:34"/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1 ">Max number of guests</h3>
                        <input type="number"  
                                value={maxGuests} 
                                onChange={ev => setMaxGuests(ev.target.value)}/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1 ">Price per night</h3>
                        <input type="number"  
                                value={price} 
                                onChange={ev => setPrice(ev.target.value)}/>
                    </div>
                </div>
                <button className="my-4 primary" type="submit">Save</button>
            </form>
        </div>
    );
}