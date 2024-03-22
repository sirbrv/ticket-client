import "../calculater/calculater.css";

function Buttom(props) {
  return (
    <>
      <div
        className={`btnDigital ${props.clasButtom ? "operater" : ""}`.trimEnd()}
        onClick={() => props.handdleClick(props.valor)}
      >
        {props.valor}
      </div>
    </>
  );
}

export default Buttom;
