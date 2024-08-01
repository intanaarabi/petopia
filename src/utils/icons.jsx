
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { PiCatFill, PiDogFill  } from 'react-icons/pi';
import { Sex , Species} from '../enums';

export const getSexIcon = (sex) => {
    switch (sex) {
        case Sex.MALE:
            return <IoMdMale className="text-accent-primary" />;
        case Sex.FEMALE:
            return <IoMdFemale className="text-accent-tertiary" />;
        default:
            return null;
    }
}

export const getSpeciesIcon = (species) => {
    switch (species) {
        case Species.CAT:
            return <PiCatFill />;
        case Species.DOG:
            return <PiDogFill />
        default:
            return null;
    }
}