import { useState, useEffect, useContext } from 'react';
import { HeaderAtom } from '../../atoms/atomSample';
import { HomeConsumer, HomeContext } from './HomeContext';
import { useRecoilState } from 'recoil';
import { reqGet } from '../../service';


export default function Home() {
    const [HeaderItem, setHeaderItem] = useRecoilState(HeaderAtom);
    const { lotGridRows, setLotGridRows } = useContext(HomeContext); //모듈 전역 컨텍스트
    const [item_sample, setItem_sample] = useState([{}]);
   
    // const getItemSample = (item_sample) => {
    //     fetch(`/test/getItemSample?item_sample=${item_sample}`, { credentials: 'include' })
    //         .then((res) => res.json())
    //         .then((msg) => setItem_sample(msg))
    //         .catch(err => alert('Error' + err));
    // }
    const getItemSample = (item_sample) => {
        fetch(`api/getTest`, { credentials: 'include' })
            .then((res) => res.json())
            .then((msg) => setItem_sample(msg))
            .catch(err => alert('Error' + err));
    }



    
    return (
        <div>
            <SubHome />
            <input type='text' onChange={(e) => { setLotGridRows(e.target.value) }} />
            <button onClick={() => getItemSample(item_sample)}>전송</button>
            <HomeConsumer />
        </div>
    )
}

export function SubHome() {
    const { lotGridRows, setLotGridRows } = useContext(HomeContext); //모듈 전역 컨텍스트
    const [item_sample, setItem_sample] = useState([{}]);
    useEffect(()=>{
        //reqGet('api/getTest',{},(result)=>{ setItem_sample(result) });
        getItemSample();
    },[])
    const getItemSample = (item_sample) => {
        fetch(`api/getTest`, { credentials: 'include' })
        .then((res) => res.json())
        .then((msg) => setItem_sample(msg))
        .catch(err => alert('Error' + err));
    }
    useEffect(()=>{}, [item_sample]);

    return (
        <div>
            <header>
                <h2>
            GND KOREA{lotGridRows}
                </h2>
            </header>
            <main>
                {item_sample.map((item,idx)=>
                        (<label>{item.title}</label>)
                )}
            </main>
            <section style={{backgroundColor:'#fff',display:'flex',width:'90%'}}>소프트웨어 이슈등록
            <table>
                <thead>
                    <th>작성자</th> <th>내용</th> <th>일시</th> <th>-</th>
                </thead>
                <tr>
                    <td>TEST</td><td>내용</td><td>내용</td><td>내용</td>
                </tr>
                <tr>
                    <td>일시</td><td>내용</td><td>내용</td><td>내용</td>
                </tr>
                <tr>
                    <td>-</td><td>내용</td><td>내용</td><td>내용</td>
                </tr>
            </table>
            </section>
                
            
        </div>
    )
}