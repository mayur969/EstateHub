import './list.scss'
import Card from"../card/Card"

function List( { posts } ){

  return (
    <div className='list'>
      {posts.map(item=>{
        return <Card key={item._id} item={item}/>
      })}
    </div>
  )
}

export default List