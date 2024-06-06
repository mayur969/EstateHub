import "./listPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {

  const data = useLoaderData();
  // console.log(posts.data)
  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter/>
        <Suspense fallback={
          <p>...Loading</p>
        }>
          <Await 
            resolve={data.postsPromise}
            errorElement={
              <p>Error Loading Posts!</p>
            }
          >
            {(postsPromise) =>{
                return postsPromise.data.map((post)=>(
                  <Card key={post._id} item={post}/>
                ))
              }
            }
          </Await>
        </Suspense>
      </div>
    </div>
    <div className="mapContainer">
    <Suspense fallback={
          <p>...Loading</p>
        }>
          <Await 
            resolve={data.postsPromise}
            errorElement={
              <p>Error Loading Posts!</p>
            }
          >
            {(postsPromise) =>{
                  <Map items={postsPromise.data}/> 
              }
            }
          </Await>
        </Suspense>
    </div>
  </div>;
}

export default ListPage;
