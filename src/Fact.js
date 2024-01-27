import {useState} from "react";
import supabase from "./supabase";
import CATEGORIES from "./categories";

function Fact({el, setFacts}) {

    const [isUpdating, setIsUpdating] = useState(false);
    const isDeputed = el.votesInteresting + el.votesMindblowing < el.votesFalse;

    async function handleVote(columnName) {
        setIsUpdating(true);
        const {data: updatedFact, error} = await supabase
            .from('facts')
            .update({[columnName]: el[columnName] + 1})
            .eq('id', el.id)
            .select();

        setIsUpdating(false);
        if(!error) setFacts((facts) => facts.map((f)=>
            f.id === el.id ? updatedFact[0] : f
        ))
    }

    return (
        <li key={el.id} className="fact">
            <p>
                {isDeputed ? <span className="disputed">
                    [⛔️DISPUTED]</span> : null}
                {el.text}
                <a className="source" href={el.source} target="_blank">
                    (Source)
                </a>
            </p>
            <span className="tag" style={{
                backgroundColor: CATEGORIES.find((cat) =>
                    cat.name === el.category).color
            }}>
                {el.category}
            </span>
            <div className="vote-buttons">
                <button onClick={() => {handleVote("votesInteresting")}} disabled={isUpdating}>👍 {el.votesInteresting}</button>
                <button onClick={() => {handleVote("votesMindblowing")}} disabled={isUpdating}>🤯 {el.votesMindblowing}</button>
                <button onClick={() => {handleVote("votesFalse")}} disabled={isUpdating}>⛔️ {el.votesFalse}</button>
            </div>
        </li>
    )
}

export default Fact;