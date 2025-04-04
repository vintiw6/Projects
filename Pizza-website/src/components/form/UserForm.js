'use client'; 
import AddressInputs from "./AddressInputs"; 
import EditableImage from "@/components/layout/EditableImage"; 
import { useProfile } from "@/components/UseProfile"; 
import { useState } from "react"; 

export default function UserForm({user, onSave}) {
    const [userName, setUserName] = useState(user?.userinfo?.name || ''); 
    const [image, setImage] = useState(user?.userinfo?.image || '');
    const [phone, setPhone] = useState(user?.userinfo?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.userinfo?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.userinfo?.postalCode || '');
    const [city, setCity] = useState(user?.userinfo?.city || '');
    const [country, setCountry] = useState(user?.userinfo?.country || '');
    const [admin, setAdmin] = useState(user?.userinfo?.admin || false);
    
    const {data:loggedInUserData} = useProfile();

    function handleAddressChange(propName, value) {
        if (propName === 'phone') setPhone(value); 
        if (propName === 'streetAddress') setStreetAddress(value); 
        if (propName === 'postalCode') setPostalCode(value);
        if (propName === 'city') setCity(value);
        if (propName === 'country') setCountry(value);
    }

    return (
        <div className="md:flex gap-4">
            <div className="p-2 rounded-lg relative max-w-[120px]">
                <EditableImage link={image} setLink={setImage} />
            </div>
            <form
                className="grow"
                onSubmit={ev =>
                    onSave(ev, {
                    name:userName, image, phone, admin,
                        streetAddress, city, country, postalCode,
                    })
                }
            >
                <label>
                    First and last name
                </label>
                <input
                    type="text" 
                    placeholder="First and last name"
                    value={userName} 
                    onChange={ev => 
                        setUserName(ev.target.value)
                    }
                />
                <label>
                    Email
                </label>
                <input
                    type="email"
                    disabled={true}
                    value={user.email}
                    placeholder={'email'}
                />
                <AddressInputs
                    addressProps={{phone, streetAddress, postalCode, city, country}}
                    setAddressProp={handleAddressChange}
                />
                {loggedInUserData.admin && (
                    <div>
                        <label 
                            className="p-2 inline-flex items-center gap-2 mb-2" 
                            htmlFor="adminCb"
                        >
                            <input
                                id="adminCb" type="checkbox" className="" value={'1'}
                                checked={admin}
                                onChange={ev => setAdmin(ev.target.checked)}
                            />
                            <span>
                                Admin
                            </span>
                        </label>
                    </div>
                )}
                <button type="submit">Save</button>
            </form>
        </div>
    );
}