import React, { useContext } from 'react';
import { AvatarContex } from '../contex/AvatarContex';
import { Button } from 'flowbite-react';

const Profile = () => {
    const { avatar, setAvatar } = useContext(AvatarContex);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Logika untuk menyimpan avatar, misalnya mengirim ke server
        console.log("Avatar saved:", avatar);
    };

    return (
        <div>
            <img
                src={avatar}
                className="w-24 h-24 bg-white rounded-full"
            />
            <input type="file" onChange={handleAvatarChange} className="mt-2" />
            <Button color="blue" className="mt-2" onClick={handleSave}>
                Save
            </Button>
            
        </div>
    );
}

export default Profile;
