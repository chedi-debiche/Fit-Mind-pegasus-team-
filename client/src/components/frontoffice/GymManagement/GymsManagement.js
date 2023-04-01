import HeaderFront from "../shared/HeaderFront";
import FooterFront from "../shared/FooterFront";
import { FormText, Form, FormGroup, Label, Input, Button , Row , Col, Alert } from "reactstrap";
import { Card, CardBody, CardTitle, CardText,Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState ,useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios';

import "./gyms.css" ;


const GymsManagement=()=>{
  const [gyms, setGyms] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formValues, setFormValues] = useState({
      name: '',
      description: '',
      localisation: '',
      photo: '',
      services: '',
    });

    const handleEdit = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/gyms/${id}`);
        console.log(id)
        console.log(response.data)
        setFormValues(response.data);
        setEditing(true);
        setEditId(id);
      } catch (error) {
        console.error(error);
      }
    };

    const handleVisible = async () => {
  setShowForm(!showForm) ;
    }

    useEffect(() => {
      getGyms();
    }, []);

    const getGyms = async () => {
     
      try {
        const response = await axios.get('http://localhost:5000/api/gyms/getAll');
        setGyms(response.data);
      } catch (error) {
        console.error(error);
      }
    };


    const AddGyms =async (e)=>{
      e.preventDefault();
      try{
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('description', formValues.description);
      formData.append('services', formValues.services);
      formData.append('localisation', formValues.localisation);
      formData.append('photo', formValues.photo);



      if (editing) {
          await axios.put(`http://localhost:5000/api/gyms/update/${editId}`, formData);
        setEditing(false);
        console.log(formData);
        console.log(editing);
        
      } else {
         await axios.post('http://localhost:5000/api/gyms/add', formData);
      }
console.log(e) ;
      setFormValues({
        name: '',
        description: '',
        price: '',
        photo: '',
        quantity: '',
      });
      getGyms() ;
    }
    catch (error) {
      console.error(error);
    }
  }



  
    
    return (
        <div style={{backgroundColor : "black"}}>
    <HeaderFront/>
    <main style={{ background: 'black' }}>
      {/*? Hero Start */}
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Gyms Management</h2>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Button className='me-1 float-right' color='success' size='lg' onClick={()=> handleVisible()}>
        Add Your Gym
      </Button> 
        
     { showForm && (
    <Container>
      {/* informations :  */}


    <Form onSubmit={AddGyms}>
  <h2 className="text-center mb-4"style={{ color: "white", fontSize: "6rem" }}>Gyms</h2>
  <Row form>
    <Col md={6}>
      <FormGroup>
        <Label for="height" style={{ color: "white", fontSize: "2rem" }}>
          Gym Name:
        </Label>
        <Input style={{ fontSize: "2rem" }}
          type="string" name="height" id="name" value={formValues.name}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }  />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="weight" style={{ color: "white", fontSize: "2rem" }}>
          Localisation :
        </Label>
        <Input style={{ fontSize: "2rem" }}
          type="string"
          name="weight"
          id="localisation"
          value={formValues.localisation}
          onChange={(e) =>
            setFormValues({ ...formValues, localisation: e.target.value })
          }
        />
      </FormGroup>
    </Col>
  </Row>

<Row>
    <Col>
    <FormGroup>
    <Label for="age" style={{ color: "white", fontSize: "2rem" }}>
      Services:
    </Label>
    <Input style={{ fontSize: "2rem" }}
      type="text"
      name="age"
      id="services"
      value={formValues.services}
      onChange={(e) =>
        setFormValues({ ...formValues, services: e.target.value })
      }

    />
  </FormGroup>
  </Col>



<Col>

  <FormGroup>
    <Label
      for="activityFactor"
      style={{ color: "white", fontSize: "2rem" }}
    >
      Description:
    </Label>
    <Input style={{ fontSize: "2rem" }}
      type="text"
      name="activityFactor"
      id="description"
      value={formValues.description}
      onChange={(e) =>
        setFormValues({ ...formValues, description: e.target.value })
      }
    >
    </Input>
  </FormGroup>
  
    </Col>
</Row>
 
<FormGroup  style={{ margin: "0 auto", width: "20%" }}>
    <Label for="file-input" style={{ color: "white", fontSize: "2rem" }}>
    <FaCloudUploadAlt className="file-icon" />
Gym Picture
    </Label>
    <Input style={{ fontSize: "2rem" }}
      type="file"
      name="height" 
      id="file-input"
      onChange={(e) => {
        setFormValues({ ...formValues, photo: e.target.files[0] });
      }}
    >
    </Input>
  </FormGroup>

  <div  style={{ margin: "0 auto", width: "17%" }}><Button type="submit"  color="danger"
  size="lg"
  className="rounded-pill shadow-sm"
>
{editing ? 'Update' : 'Add'} </Button>
{editing && (
<Button color="danger"
  size="lg"
  className="rounded-pill shadow-sm" onClick={() => setEditing(false)} > Cancel</Button>) }

</div>
  <br />
  
</Form>

    </Container>)}


   { <div className="main_content">

    {gyms.map((gym) =>
        <div className="card" key={gym.id}>
            <div className="card_img">
            <img
        src={`http://localhost:5000/uploads/${gym.photo}`}
//   alt={`Image of ${product.name}`}
              width="400"
            />
            </div>
            <div className="card_header">
                <h2 style={{color: "red"}}>{gym.name}</h2>
                <p>{gym.description}</p>
                <p >Services :{gym.services}</p>
                <p className="price">{gym.localisation}</p>
                <div className="btn" onClick={() => handleEdit(gym._id)} >Update</div>
            </div>
        </div>
       
        
        )}

      </div>}






    
  <FooterFront/>
        </div>
      )
}

export default GymsManagement 
