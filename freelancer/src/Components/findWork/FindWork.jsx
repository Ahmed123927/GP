import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../images/img-1.jpg';
import img2 from '../../images/img-2.jpg';
import img3 from '../../images/img-3.jpg';
import img4 from '../../images/img-4.jpg';
import se20 from '../../images/se20.webp';
import se21 from '../../images/se21.jpg';
import se22 from '../../images/se22.jpg';
import se19 from '../../images/se19.jpg';
import se24 from '../../images/se24.jpg';
import se25 from '../../images/se25.jpg';
import se26 from '../../images/se26.jpg';
// import opportunity from '   ../../images/opportunity.png';

export default function FindWork() {

  function addcatalogcontent() {
    document.getElementById("catalog").classList.add("earnchoice");
    document.getElementById("talent").classList.remove("earnchoice");
    document.getElementById("catalogcontent").classList.remove("d-none");
    document.getElementById("talentcontent").classList.add("d-none");
  }

  function addtalentcontent() {
    document.getElementById("talent").classList.add("earnchoice");
    document.getElementById("catalog").classList.remove("earnchoice");
    document.getElementById("talentcontent").classList.remove("d-none");
    document.getElementById("catalogcontent").classList.add("d-none");
  }


  return <>

   

    <div className="container  m-auto    ">
      
      <article className=" text-center p-5   ">
        <h2 className="   fw-bold fw-bolder main-color ">
          Our Workers
        </h2>

        <div className="text-center">
          <p className="  text-center">
            Here are some of our Workers. If you
            have any Tasks you’d
            like <br />He will implement it in the best way.
          </p>
        </div>


      </article>
      
      <div className="row  d-flex r  ">
        <div className="ourfreelanc d-flex gap-4   pb-5">

          <div className="col-md-3 sec  ">
            <div class="card" style={{ width: '18rem' }} >
              <img src={img1} class="card-img-top" alt="..." />
              <div class="card-body ">

         
                <h6 class="card-title text-muted  "> UI & UX Designe   </h6>  
             
                

                <p class="card-text ">She packed her seven versalia, put her initial into the belt and made herself on the way...</p>
                <div className=' blog'>
                  <Link to="/register " className=' blog '> Read More <i  class=" blog fa-solid fa-arrow-right main-colo  "></i></Link>

                </div>


              </div>

            </div>

          </div>
          <div className="col-md-3 sec ">
            <div class="card" style={{ width: '18rem' }} >
              <img src={img2} class="card-img-top" alt="..." />
              <div class="card-body">
                <h6 class="card-title text-muted">Node.js Developers</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content...</p>
                <div className=' blog'>
                  <Link to="/register " className=' blog '> Read More <i  class=" blog fa-solid fa-arrow-right main-colo  "></i></Link>

                </div>

              </div>
            </div>

          </div>
          <div className="col-md-3 sec ">
            <div class="card" style={{ width: '18rem' }} >
              <img src={img3} class="card-img-top" alt="..." />
              <div class="card-body">
                <h6 class="card-title text-muted">Frontend Developers</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content...</p>
                <div className=' blog'>
                  <Link to="/register " className=' blog '> Read More <i  class=" blog fa-solid fa-arrow-right main-colo  "></i></Link>

                </div>

              </div>
            </div>

          </div>
          <div className="col-md-3  sec ">
            <div class="card" style={{ width: '18rem' }} >
              <img src={img4} class="card-img-top" alt="..." />
              <div class="card-body">
                <h6 class="card-title text-muted">Digital Marketing</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content...</p>
                <div className=' blog'>
                  <Link to="/register " className=' blog '> Read More <i  class=" blog fa-solid fa-arrow-right main-colo  "></i></Link>

                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>



    <div className='earn container'>

      <div className="row">


        <div className="text">

          <h3>Ways <span> to earn</span></h3>

        </div>


        <div className='col-md-6 text-center'>
          <h4 className='earnchoice' id='talent' onClick={addtalentcontent}>Talent Marketplace™</h4>
        </div>

        <div className='col-md-6 text-center'>
          <h4 id='catalog' onClick={addcatalogcontent}>Project Catalog™</h4>
        </div>

        <div id="earncontent">

          <div id='talentcontent' className="container p-5 ">

            <div className="row justify-content-center align-items-center gap-5">

              <div className='col-md-3 '>
                <div className='text-center'>
                  <figure className=' '>
                    <img src={se20} alt="" className='  findworkimage' />
                  </figure>
                  <h5 className=''>1. Create a profile</h5>
                  <p className='  '>Highlight your skills and experience, show your portfolio, and set your ideal pay rate.</p>
                </div>
              </div>



              <div className='col-md-3 '>
                <div className=' text-center'>
                  <figure className=' '>
                    <img src={se21} alt="" className=' findworkimage' />
                  </figure>
                  <h5 className=''>2. Search for jobs</h5>
                  <p>Search on Talent Marketplace for the hourly or fixed-price work you’re looking for.</p>
                </div>
              </div>



              <div className='col-md-3 '>
                <div className=' text-center'>
                  <figure className=' '>
                    <img src={se25} alt="" className=' findworkimage' />
                  </figure>
                  <h5 className="">3. Submit a proposal</h5>
                  <p>Set your rate and tell clients why you’re the right person for the job!</p>
                </div>
              </div>

            </div>

            <div className=" m-5 row d-flex  justify-content-center align-items-center gap-5  mx-auto">

              <div className='col-md-3 '>
                <div className='text-center'>
                  <figure className=' '>
                    <img src={se24} alt="" className=' findworkimage' />
                  </figure>
                  <h5 className=''>4. Get contract</h5>
                  <p>If the client likes your proposal they’ll send you a contract to begin working</p>
                </div>
              </div>



              <div className='col-md-3 '>
                <div className='text-center'>
                  <figure className=' '>
                    <img src={se19} alt="" className=' findworkimage ' />
                  </figure>
                  <h5 className=''>5. Complete the work</h5>
                  <p>Check steps off as you finish and work with your client if you have questions.</p>
                </div>
              </div>


              <div className='col-md-3 '>
                <div className='text-center'>
                  <figure className=' '>
                    <img src={se22} alt="" className=' findworkimage' />
                  </figure>
                  <h5 className="">6. Get paid securely</h5>
                  <p>Once the client approves your work, you'll get paid and they can leave you feedback</p>
                </div>
              </div>

            </div>




          </div>

          <div id='catalogcontent' className="container p-5 d-none">

            <div className="row justify-content-center align-items-center gap-5  mx-auto  ">

              <div className='col-md-3    '>
                <div className=' text-center'>
                  <figure className=' '>
                    <img src={se20} alt="" className='  findworkimage' />
                  </figure>
                  <h5 className=''>1. Create a project</h5>
                  <p className="des">Create a unique project that showcases your expertise.</p>
                </div>
              </div>



              <div className='col-md-3 '>
                <div className=' text-center'>
                  <figure className=' '>
                    <img src={se26} alt="" className=' findworkimage' />
                  </figure>
                  <h5 className=''>2. Project is reviewed</h5>
                  <p className='des'>We'll let you know if you need to make any changes before it's visible to clients.</p>
                </div>
              </div>


{/* 
              <div className='col-md-3 '>
                <div className=' text-center'>
                  <figure className=' '>
                    <img src={opportunity} alt="" className=' findworkimage' />
                  </figure>
                  <h5 className="">3. Get an order</h5>
                  <p>Your timeline starts once the client provides the info you need.</p>
                </div>
              </div> */}

            </div>

            <div className="row justify-content-center align-items-center gap-5  mx-auto">

              <div className='col-md-3 '>
                <div className='text-center'>
                  <figure className=' '>
                    <img src={se19} alt="" className=' findworkimage ' />
                  </figure>
                  <h5 className=''>5. Complete the work</h5>
                  <p>Check steps off as you finish and work with your client if you have questions.</p>
                </div>
              </div>

              <div className='col-md-3 '>
                <div className='text-center'>
                  <figure className=' '>
                    <img src={se22} alt="" className=' findworkimage' />
                  </figure>
                  <h5 className="">6. Get paid securely</h5>
                  <p>Once the client approves your work, you'll get paid and they can leave you feedback.</p>
                </div>
              </div>


            </div>
          </div>

        </div>


      </div>

    </div>

  </>;

}
