import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Spinner } from 'react-bootstrap';
import LineChart from 'components/graficas/LineChart';
import BarChart from 'components/graficas/BarChart';
import BarChart2 from 'components/graficas/BarChart2';
import SegmentChart from 'components/graficas/SegmentChart';
import SegmentChartGrandient from 'components/graficas/SegmentChartGrandient';
import Pie1 from 'components/graficas/Pie1';
import Pie2 from 'components/graficas/Pie2';
import Pie3 from 'components/graficas/Pie3';
import Chart from "components/graficas/Chart";
import { PieController } from 'chart.js';
import React, { useState } from 'react';
import { useEffect } from 'react';

import AnimationRevealPage from "helpers/AnimationRevealPage.js"
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderLight from "components/headers/light"
import ReporteUsuarios from 'components/ReporteUsuarios';

function Reportes() {

    // INICIO: Probando actualización de datos en Chart
    var chartReference = {};

    const data2 = {
        labels: [],
        datasets: [
        {
            label: "# of Votes",
            data: [],
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
        },
        ],
    };

    const data3 = {
        labels: ["1", "2", "3", "4", "5", "6"],
        datasets: [
        {
            label: "# of Votes",
            data: [3, 2, 5, 3, 19, 12],
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
        },
        ],
    };

    /*
    const options2 = {
        scales: {
        yAxes: [
            {
            ticks: {
                beginAtZero: true,
            },
            },
        ],
        },
    };
    */

    const [data, setData] = useState(data2); // REMOVED BRACKETS
    //const [options, setOptions] = useState(options2); // REMOVED BRACKETS

    const updatePlot = () => {
        setData(data3);
        //setOptions(options2); // This is redundant for the purpose
    };
    // FIN: Probando actualización de datos en Chart

    //const scores = [14.56, 70.54, 9.42, 5.42];
    //const scores2 = [1, 40, 30, 55];
    //const labels2 = ["Google","Bing","Baidu","Otros"];
    const scores2 = [2,4];
    const labels2 = ["a","b"];

    const scores3 = []
    const labels3 = []

    const ancho = "40%";
    const alto = "40%";

    const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

    const [scores, setScores] = useState('');
    const [labels, setLabels] = useState('');
    const [nomGrafico, setNomGrafico] = useState('');

    const [prueba, setPrueba] = useState('');

    const getCitasEspec = async () => {
        try {
            const token = await getAccessTokenSilently()
            const response = await fetch('http://localhost:3001/reportes/citasEspecialidad', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log("Citas x especialiad: ", data)
            return data;
        }
        catch (error) {
            console.log(error.message)
          }
    }

    function addData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }

    const unouno = async () => {
        getCitasEspec().then(result =>{
            //Solo tendras disponible la informacion de la promesa aqui dentro de then
            console.log("Result: ",result);
            console.log("0: ", result[0])
            console.log("1: ", result[1])
            setScores( result[1] )
            setLabels( result[0] )
            scores3 = result[1]
            labels3 = result[0]
            console.log("scores3: ", scores3)
            console.log("labels3: ", labels3)
            setNomGrafico("Citas por especialidad")
            addData(Pie1,labels3,scores3)
            //setPrueba( Pie1(scores3,labels3,"nomGrafico") )
            //Pie1(scores3,labels3,"nomGrafico")
            console.log("Prueba: ",prueba)
        //}).catch(e => console.log(e));
        }).catch(e => console.log(e));
    }

    //setPrueba( Pie1(scores2,labels2,nomGrafico) )

    useEffect(() => {
        
    })

    //setPrueba( Pie1(scores,labels,nomGrafico) )    

    return (
            <AnimationRevealPage>
                <HeaderLight />
                <div>
                    <div style={{width: "60%", height: alto}}>
                        <p>Reporte usuarios</p>
                        <ReporteUsuarios />
                    </div>
                    <br></br>
                </div>
            </AnimationRevealPage>
    );
}
export default Reportes
//export default withAuthenticationRequired(ConsultarReportes, { onRedirecting: () => <Spinner animation="border" />,});