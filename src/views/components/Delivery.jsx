import CheckList from './CheckList';
import Gallery from './Gallery';
import ContentComponent from './ContentComponent';

function Delivery(props) {
  const { delivery } = props;

  return (
    <>
      <div className="project-process-delivery" id="project_process_delivery">
        <h4 class="title">delivery</h4>

        <CheckList checkList={delivery.checkList} />

        <Gallery gallery={delivery.gallery}/>

        <ContentComponent content={delivery.content} />
      </div>
    </>
  );
}

export default Delivery;
