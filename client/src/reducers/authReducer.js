// determine if a user is logged in 
import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}

// cases:
// null: (Situation) make request to backend to get current user: (notes) null indicates we dont really know what is goin on
// User Model: (Situation) reuqest complete; user logged in: (notes) object containing user ID
// false: (Situation) request done; user not logged in: (notes) false means sure user not logged in