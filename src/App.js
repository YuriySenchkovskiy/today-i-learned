import './styles.css'
import  './media.css'
import {useEffect, useState} from "react";
import supabase from "./supabase";
import Header from "./Header";
import NewFactForm from "./NewFactForm";
import CategoryFilter from "./CategoryFilter";
import Loader from "./Loader";
import FactList from "./FactList";

function App() {
    const [showForm,  setShowForm] = useState(false);
    const [facts, setFacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('all');

    useEffect(() => {
        async function getFacts() {
            setIsLoading(true);

            let query
                = supabase.from('facts').select('*');
            if(currentCategory !== 'all') query
                = query.eq('category', currentCategory);

            const {data: facts, error} = await query
                .order('text', {ascending: true})
                .limit(100);

            if(!error) setFacts(facts);
            else alert('There was a problem getting data')
            setIsLoading(false);
        }

        getFacts();
    }, [currentCategory]);

    return (
        <>
            <Header showForm={showForm} setShowForm={setShowForm}/>
            {showForm ? <NewFactForm setFacts={setFacts} setShowForm={setShowForm}/> : null}

            <main className="main">
                <CategoryFilter setCurrentCategory={setCurrentCategory}/>
                {isLoading ? <Loader/> : <FactList facts={facts} setFacts={setFacts}/>}
            </main>
        </>
);
}

export default App;
