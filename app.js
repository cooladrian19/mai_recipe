import {initializeApp} from 'firebase/app' 
import {getDatabase, ref, push } from 'firebase/database'

const apiKey = "5d2491564ef64a7d8a7fcb77112b1327 ";
const appSettings = {
    databaseURL: "https://mai-s-recipe-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const userAccountsDB = ref(database, "userAccounts")

function fetchRecipe (query) {
    const url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=${query}&query=$(query}$number=10'
}

