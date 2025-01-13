import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDmI0zRauvzaL4oEuXinkmXhGiwTsYxYQc",
  authDomain: "insan-cemerlang-ee7af.firebaseapp.com",
  projectId: "insan-cemerlang-ee7af",
  storageBucket: "insan-cemerlang-ee7af.firebasestorage.app",
  messagingSenderId: "1047091827759",
  appId: "1:1047091827759:web:0f1742d6f3922f856de2da",
  measurementId: "G-GL8J5GC8XB"
};

// Inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

// fungsi ambil daftar pelanggan 
export async function ambilDaftarPelanggan() {
  const refDokumen = collection(basisdata, "pelanggan");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikankueri = await getDocs(kueri);

  let hasilkueri = [];
  cuplikankueri.forEach((dokumen) => {
    hasilkueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      alamat: dokumen.data().alamat,
      nohape: dokumen.data().nohape
      
    })
  })

  return hasilkueri;
}

// fungsi menambah data pelanggan 
export async function tambahPelanggan(nama, alamat, nohape) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "pelanggan"), {
      nama: nama,
      alamat: alamat,
      nohape: nohape
    })
    
    // menampilkan pesan berhasil
    console.log("berhasil menyimpan data pelanggan")
  } catch (error) {
    // menampilkan pesan gagal 
  console.log("gagal menyimpan data pelanggan")
  }
}