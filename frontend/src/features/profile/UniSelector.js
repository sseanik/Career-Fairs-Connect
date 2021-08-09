//A selector component to be used in both university and student profile edit page
import { SelectControl } from 'formik-chakra-ui';

export default function UniSelector() {
    return (
        <SelectControl
            name='university'
            selectProps={{ placeholder: 'Select option' }}
        >
            <option value='Australian Catholic University'>
                Australian Catholic University
            </option>
            <option value='Australian National University'>
                Australian National University
            </option>
            <option value='Bond University'>Bond University</option>
            <option value='Charles Darwin University'>
                Charles Darwin University
            </option>
            <option value='Charles Stuart University'>
                Charles Stuart University
            </option>
            <option value='CQUniversity'>CQUniversity</option>
            <option value='Curtin University'>Curtin University</option>
            <option value='Deakin University'>Deakin University</option>
            <option value='Edith Cowan University'>
                Edith Cowan University
            </option>
            <option value='Federation University Australia'>
                Federation University Australia
            </option>
            <option value='Flinders University'>
                Flinders University
            </option>
            <option value='Griffith University'>
                Griffith University
            </option>
            <option value='James Cook University'>
                James Cook University
            </option>
            <option value='La Trobe University'>
                La Trobe University
            </option>
            <option value='Macquarie University'>
                Macquarie University
            </option>
            <option value='Monash University'>Monash University</option>
            <option value='Murdoch University'>Murdoch University</option>
            <option value='Queensland University of Technology'>
                Queensland University of Technology
            </option>
            <option value='RMIT University'>RMIT University</option>
            <option value='Southern Cross University'>
                Southern Cross University
            </option>
            <option value='Swinburne University of Technology'>
                Swinburne University of Technology
            </option>
            <option value='Torrens University Australia'>
                Torrens University Australia
            </option>
            <option value='University of Adelaide'>
                University of Adelaide
            </option>
            <option value='University of Canberra'>
                University of Canberra
            </option>
            <option value='University of Divinity'>
                University of Divinity
            </option>
            <option value='University of Melbourne'>
                University of Melbourne
            </option>
            <option value='University of New England'>
                University of New England
            </option>
            <option value='University of New South Wales'>
                University of New South Wales
            </option>
            <option value='University of Newcastle'>
                University of Newcastle
            </option>
            <option value='University of Notre Dame Australia'>
                University of Notre Dame Australia
            </option>
            <option value='University of Queensland'>
                University of Queensland
            </option>
            <option value='University of South Australia'>
                University of South Australia
            </option>
            <option value='University of Southern Queensland'>
                University of Southern Queensland
            </option>
            <option value='University of Sydney'>
                University of Sydney
            </option>
            <option value='University of Tasmania'>
                University of Tasmania
            </option>
            <option value='University of Technology Sydney'>
                University of Technology Sydney
            </option>
            <option value='University of the Sunshine Coast'>
                University of the Sunshine Coast
            </option>
            <option value='University of Western Australia'>
                University of Western Australia
            </option>
            <option value='University of Wollongong'>
                University of Wollongong
            </option>
            <option value='Victoria University'>
                Victoria University
            </option>
            <option value='Western Sydney University'>
                Western Sydney University
            </option>
        </SelectControl>
    )
}
