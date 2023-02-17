import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ObjectType, User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalService } from 'src/app/services/storage/local.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  agents: Observable<string> | undefined;
  registrationCompleted=false;
  user = {} as User
  signupFailedStatus = ""
  firstName: any;
  lastName: any;
  gender: any;
  email: any;
  password: any;
  dateofbirth: any;
  address: any;
  pincode: any;
  state: any;
  city: any;

  formdata: any | undefined;

  states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ]
  cities = ["Abohar",
    "Achalpur",
    "Adilabad",
    "Adityapur",
    "Adoni",
    "Agartala",
    "Agra",
    "Ahmadabad",
    "Ahmadnagar",
    "Aizawl",
    "Ajmer",
    "Akbarpur",
    "Akola",
    "Alandur",
    "Alappuzha",
    "Aligarh",
    "Allahabad",
    "Alwar",
    "Ambala",
    "Ambala Sadar",
    "Ambarnath",
    "Ambattur",
    "Ambikapur",
    "Ambur",
    "Amravati",
    "Amreli",
    "Amritsar",
    "Amroha",
    "Anand",
    "Anantapur",
    "Anantnag",
    "Arrah",
    "Asansol",
    "Ashoknagar Kalyangarh",
    "Aurangabad",
    "Aurangabad",
    "Avadi",
    "Azamgarh",
    "Badlapur",
    "Bagaha",
    "Bagalkot",
    "Bahadurgarh",
    "Baharampur",
    "Bahraich",
    "Baidyabati",
    "Baleshwar Town",
    "Ballia",
    "Bally",
    "Bally City",
    "Balurghat",
    "Banda",
    "Bankura",
    "Bansberia",
    "Banswara",
    "Baran",
    "Baranagar",
    "Barasat",
    "Baraut",
    "Barddhaman",
    "Bareilly",
    "Baripada Town",
    "Barnala",
    "Barrackpur",
    "Barshi",
    "Basirhat",
    "Basti",
    "Batala",
    "Bathinda",
    "Beawar",
    "Begusarai",
    "Belgaum",
    "Bellary",
    "Bengaluru",
    "Bettiah",
    "Betul",
    "Bhadrak",
    "Bhadravati",
    "Bhadreswar",
    "Bhagalpur",
    "Bhalswa Jahangir Pur",
    "Bharatpur",
    "Bharuch",
    "Bhatpara",
    "Bhavnagar",
    "Bhilai Nagar",
    "Bhilwara",
    "Bhimavaram",
    "Bhind",
    "Bhiwadi",
    "Bhiwandi",
    "Bhiwani",
    "Bhopal",
    "Bhubaneswar Town",
    "Bhuj",
    "Bhusawal",
    "Bid",
    "Bidar",
    "Bidhan Nagar",
    "Biharsharif",
    "Bijapur",
    "Bikaner",
    "Bilaspur",
    "Bokaro Steel City",
    "Bongaon",
    "Botad",
    "Brahmapur Town",
    "Budaun",
    "Bulandshahr",
    "Bundi",
    "Burari",
    "Burhanpur",
    "Buxar",
    "Champdani",
    "Chandannagar",
    "Chandausi",
    "Chandigarh",
    "Chandrapur",
    "Chapra",
    "Chas",
    "Chennai",
    "Chhattarpur",
    "Chhindwara",
    "Chikmagalur",
    "Chilakaluripet",
    "Chitradurga",
    "Chittaurgarh",
    "Chittoor",
    "Churu",
    "Coimbatore",
    "Cuddalore",
    "Cuttack",
    "Dabgram",
    "Dallo Pura",
    "Damoh",
    "Darbhanga",
    "Darjiling",
    "Datia",
    "Davanagere",
    "Deesa",
    "Dehradun",
    "Dehri",
    "Delhi",
    "Delhi Cantonment",
    "Deoghar",
    "Deoli",
    "Deoria",
    "Dewas",
    "Dhanbad",
    "Dharmavaram",
    "Dhaulpur",
    "Dhule",
    "Dibrugarh",
    "Dimapur",
    "Dinapur Nizamat",
    "Dindigul",
    "Dum Dum",
    "Durg",
    "Durgapur",
    "Eluru",
    "English Bazar",
    "Erode",
    "Etah",
    "Etawah",
    "Faizabad",
    "Faridabad",
    "Farrukhabad-cum-Fatehgarh",
    "Fatehpur",
    "Firozabad",
    "Firozpur",
    "Gadag-Betigeri",
    "Gandhidham",
    "Gandhinagar",
    "Ganganagar",
    "Gangapur City",
    "Gangawati",
    "Gaya",
    "Ghazipur",
    "Giridih",
    "Godhra",
    "Gokal Pur",
    "Gonda",
    "Gondal",
    "Gondiya",
    "Gorakhpur",
    "Greater Hyderabad",
    "Greater Mumbai",
    "Greater Noida",
    "Gudivada",
    "Gulbarga",
    "Guna",
    "Guntakal",
    "Guntur",
    "Gurgaon",
    "Guwahati",
    "Gwalior",
    "Habra",
    "Hajipur",
    "Haldia",
    "Haldwani-cum-Kathgodam",
    "Halisahar",
    "Hanumangarh",
    "Haora",
    "Hapur",
    "Hardoi",
    "Hardwar",
    "Hassan",
    "Hastsal",
    "Hathras",
    "Hazaribag",
    "Hindaun",
    "Hindupur",
    "Hinganghat",
    "Hisar",
    "Hoshangabad",
    "Hoshiarpur",
    "Hospet",
    "Hosur",
    "Hubli-Dharwad",
    "Hugli-Chinsurah",
    "Ichalkaranji",
    "Imphal",
    "Indore",
    "Jabalpur",
    "Jagadhri",
    "Jagdalpur",
    "Jaipur",
    "Jalandhar",
    "Jalgaon",
    "Jalna",
    "Jalpaiguri",
    "Jamalpur",
    "Jammu",
    "Jamnagar",
    "Jamshedpur",
    "Jamuria",
    "Jaunpur",
    "Jehanabad",
    "Jetpur Navagadh",
    "Jhansi",
    "Jhunjhunun",
    "Jind",
    "Jodhpur",
    "Junagadh",
    "Kadapa",
    "Kaithal",
    "Kakinada",
    "Kalol",
    "Kalyani",
    "Kamarhati",
    "Kancheepuram",
    "Kanchrapara",
    "Kanpur",
    "Kanpur City",
    "Karaikkudi",
    "Karawal Nagar",
    "Karimnagar",
    "Karnal",
    "Kasganj",
    "Kashipur",
    "Katihar",
    "Khammam",
    "Khandwa",
    "Khanna",
    "Kharagpur",
    "Khardaha",
    "Khargone",
    "Khora",
    "Khurja",
    "Kirari Suleman Nagar",
    "Kishanganj",
    "Kishangarh",
    "Kochi",
    "Kolar",
    "Kolhapur",
    "Kolkata",
    "Kollam",
    "Korba",
    "Kota",
    "Kozhikode",
    "Krishnanagar",
    "Kulti",
    "Kumbakonam",
    "Kurichi",
    "Kurnool",
    "Lakhimpur",
    "Lalitpur",
    "Latur",
    "Loni",
    "Lucknow",
    "Ludhiana",
    "Machilipatnam",
    "Madanapalle",
    "Madavaram",
    "Madhyamgram",
    "Madurai",
    "Mahbubnagar",
    "Mahesana",
    "Maheshtala",
    "Mainpuri",
    "Malegaon",
    "Malerkotla",
    "Mandoli",
    "Mandsaur",
    "Mandya",
    "Mangalore",
    "Mango",
    "Mathura",
    "Maunath Bhanjan",
    "Medinipur",
    "Meerut",
    "Mira Bhayander",
    "Miryalaguda",
    "Mirzapur-cum-Vindhyachal",
    "Modinagar",
    "Moga",
    "Moradabad",
    "Morena",
    "Morvi",
    "Motihari",
    "Mughalsarai",
    "Muktsar",
    "Munger",
    "Murwara",
    "Mustafabad",
    "Muzaffarnagar",
    "Muzaffarpur",
    "Mysore",
    "Nabadwip",
    "Nadiad",
    "Nagaon",
    "Nagapattinam",
    "Nagaur",
    "Nagda",
    "Nagercoil",
    "Nagpur",
    "Naihati",
    "Nalgonda",
    "Nanded Waghala",
    "Nandurbar",
    "Nandyal",
    "Nangloi Jat",
    "Narasaraopet",
    "Nashik",
    "Navi Mumbai",
    "Navi Mumbai Panvel Raigarh",
    "Navsari",
    "Neemuch",
    "Nellore",
    "New Delhi",
    "Neyveli",
    "Nizamabad",
    "Noida",
    "North Barrackpur",
    "North Dum Dum",
    "Ongole",
    "Orai",
    "Osmanabad",
    "Ozhukarai",
    "Palakkad",
    "Palanpur",
    "Pali",
    "Pallavaram",
    "Palwal",
    "Panchkula",
    "Panihati",
    "Panipat",
    "Panvel",
    "Parbhani",
    "Patan",
    "Pathankot",
    "Patiala",
    "Patna",
    "Pilibhit",
    "Pimpri Chinchwad",
    "Pithampur",
    "Porbandar",
    "Port Blair",
    "Proddatur",
    "Puducherry",
    "Pudukkottai",
    "Pune",
    "Puri",
    "Purnia",
    "Puruliya",
    "Rae Bareli",
    "Raichur",
    "Raiganj",
    "Raigarh",
    "Raipur",
    "Rajahmundry",
    "Rajapalayam",
    "Rajarhat Gopalpur",
    "Rajkot",
    "Rajnandgaon",
    "Rajpur Sonarpur",
    "Ramagundam",
    "Rampur",
    "Ranchi",
    "Ranibennur",
    "Raniganj",
    "Ratlam",
    "Raurkela Industrial Township",
    "Raurkela Town",
    "Rewa",
    "Rewari",
    "Rishra",
    "Robertson Pet",
    "Rohtak",
    "Roorkee",
    "Rudrapur",
    "S.A.S. Nagar",
    "Sagar",
    "Saharanpur",
    "Saharsa",
    "Salem",
    "Sambalpur",
    "Sambhal",
    "Sangli Miraj Kupwad",
    "Santipur",
    "Sasaram",
    "Satara",
    "Satna",
    "Sawai Madhopur",
    "Secunderabad",
    "Sehore",
    "Seoni",
    "Serampore",
    "Shahjahanpur",
    "Shamli",
    "Shikohabad",
    "Shillong",
    "Shimla",
    "Shimoga",
    "Shivpuri",
    "Sikar",
    "Silchar",
    "Siliguri",
    "Singrauli",
    "Sirsa",
    "Sitapur",
    "Siwan",
    "Solapur",
    "Sonipat",
    "South Dum Dum",
    "Srikakulam",
    "Srinagar",
    "Sujangarh",
    "Sultan Pur Majra",
    "Sultanpur",
    "Surat",
    "Surendranagar Dudhrej",
    "Suryapet",
    "Tadepalligudem",
    "Tadpatri",
    "Tambaram",
    "Tenali",
    "Thane",
    "Thanesar",
    "Thanjavur",
    "Thiruvananthapuram",
    "Thoothukkudi",
    "Thrissur",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupati",
    "Tiruppur",
    "Tiruvannamalai",
    "Tiruvottiyur",
    "Titagarh",
    "Tonk",
    "Tumkur",
    "Udaipur",
    "Udgir",
    "Udupi",
    "Ujjain",
    "Ulhasnagar",
    "Uluberia",
    "Unnao",
    "Uttarpara Kotrung",
    "Vadodara",
    "Valsad",
    "Varanasi",
    "Vasai Virar City",
    "Vellore",
    "Veraval",
    "Vidisha",
    "Vijayawada",
    "Visakhapatnam",
    "Vizianagaram",
    "Warangal",
    "Wardha",
    "Yamunanagar",
    "Yavatmal", "Other"]
  selectedState = "------"
  selectedCity = "------"
  submitted = false;

  updateState(e: any) {
    this.selectedState = e.target.value
    // FilteredCities = this.cities.filter(item => item. === id); 
  }
  updateCity(e: any) {
    this.selectedCity = e.target.value
  }

  constructor(private http: HttpClient, private localStore: LocalService, private auth: AuthService) { }


  ngOnInit(): void {
    this.initForm();

  }

  initForm(){
    this.formdata = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      dateofbirth: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      pincode: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required)
    });

  }

  resetForm(){
    this.submitted = false;
    this.formdata.reset();
  }

  onClickSubmit(data: any) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }

    this.user.firstName = data.firstName;
    this.user.lastName = data.lastName;
    this.user.gender = data.gender;
    this.user.email = data.email;
    this.user.password = data.password;
    this.user.dateOfBirth = data.dateofbirth;
    this.user.address = data.address;
    this.user.pincode = data.pincode;
    this.user.state = data.state;
    this.user.city = data.city;
    //////console.log(data);

    this.auth.signup(this.user).subscribe(data => {
      this.registrationCompleted=true;
      this.formdata.reset();  
    },
      error => {
        switch (error['status']) {
          case 500:
            this.signupFailedStatus = "Signup Failed, Please try again later"
            break;
          default:
            this.signupFailedStatus = "Signup Failed, UnKnown Error"
        }
      });

  }

}
