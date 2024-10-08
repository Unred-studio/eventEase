import lassonde from '/workspaces/eventEase/ease/src/assets/Lassonde.png';
import Bethune from '/workspaces/eventEase/ease/src/assets/Bethune.png'

function MailCards() {
  

  return (
    <>
      <div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card h-100">
      <img src={lassonde} class="card-img-top" alt="Lassonde Events" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
      <div class="card-body">
        <h5 class="card-title">Lassonde Events</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
      <div class="card-footer">
        <small class="text-body-secondary">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
  
  <div class="col">
    <div class="card h-100">
      <img src={Bethune} class="card-img-top" alt="Bethune Events" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
      <div class="card-body">
        <h5 class="card-title">Bethune Events</h5>
        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      </div>
      <div class="card-footer">
        <small class="text-body-secondary">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
  
  <div class="col">
    <div class="card h-100">
      <img src="..." class="card-img-top" alt="York Events" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
      <div class="card-body">
        <h5 class="card-title">York Events</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
      </div>
      <div class="card-footer">
        <small class="text-body-secondary">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
</div>


    </>
  );
}

export default MailCards;
