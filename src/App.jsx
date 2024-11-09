import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [valor, setValor] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const url = "https://randomuser.me/api/?results=100";

    try {
      const response = await fetch(url);
      console.log(response);
      const json = await response.json();
      console.log("RESPONSE : ", json.results);
      setData(json.results);
    } catch (error) {
      console.error("ERROR : ", error);
    }
  };

  const accionColor = () => {
    setValor(!valor);
  };

  const ordenarPais = () => {
    const nuevaData = [...data].sort((a, b) => {
      return (
        a.location.country.toLowerCase().charCodeAt(0) -
        b.location.country.toLowerCase().charCodeAt(0)
      );
    });
    console.log("NUeva data : ", nuevaData);
    setData(nuevaData);
  };

  return (
    <>
      <div>
        <h1>Lista de usuarios</h1>
        <div>
          <button onClick={accionColor}>Cambiar color</button>
          <button onClick={ordenarPais}>Ordenar por pais</button>
        </div>
        <div className="w-[80%] ">
          <table className="w-full">
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>País</th>
              <th>Acciones</th>
            </tr>
            {data.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={`${valor && index % 2 == 0 ? "bg-slate-400" : ""}`}
                >
                  {/* Imagen */}
                  <td>
                    <img src={item.picture.large} alt="" />
                  </td>
                  {/* Nombre */}
                  <td>{item.name.first}</td>
                  {/* Apellido */}
                  <td>{item.name.last}</td>
                  {/*  Pais */}
                  <td>{item.location.country}</td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
