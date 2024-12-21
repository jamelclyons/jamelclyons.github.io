import { useSelector } from 'react-redux';

function Delivery() {
  const { delivery, delivery_check_list } = useSelector(
    (state) => state.portfolio
  );

  return (
    <>
      {delivery_check_list || delivery ? (
        <div className="project-process-delivery" id="project_process_delivery">
          <h4 class="title">DELIVERY</h4>

          <CheckList checklist={delivery_check_list} />
          <Card text={delivery} />
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Delivery;
