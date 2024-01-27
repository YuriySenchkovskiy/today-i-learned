import Fact from "./Fact";

function FactList({facts, setFacts}) {

    if(facts.length === 0)
        return (
            <p className="texts">No facts for this category yet! Create the first one! 👏</p>
        )

    return (
        <section>
            <ul className="fact-list">
                {facts.map((el) => <Fact key={el.id} el={el} setFacts={setFacts}/>)}
            </ul>
            <p className="texts">There are {facts.length} facts in the database</p>
        </section>
    )
}

export default FactList;