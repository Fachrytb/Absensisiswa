import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCjXlgysJkN-2s3Gu0forgp7as5-9NqCkI",
  authDomain: "pasar-b04a7.firebaseapp.com",
  databaseURL: "https://pasar-b04a7-default-rtdb.firebaseio.com",
  projectId: "pasar-b04a7",
  storageBucket: "pasar-b04a7.appspot.com",
  messagingSenderId: "508470916587",
  appId: "1:508470916587:web:460e9a1612e92b712e15ae",
  measurementId: "G-33T7CQCWBX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export async function ambilDaftarAbsensi() {
  const refDokumen = collection(db, "Absensi_siswa");
  const kueri = query(refDokumen, orderBy("Nama"));
  const cuplikankueri = await getDocs(kueri);

  let hasil = []; // tes
  cuplikankueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      Nis: dok.data().Nis,
      Tanggal: dok.data().Tanggal,
      Nama: dok.data().Nama,
      Alamat: dok.data().Alamat,
      Nohp: dok.data().Nohp,
      Keterangan: dok.data().Keterangan,
      Kelas: dok.data().Kelas
    });
  });

  return hasil;
}

export async function hapusdataAbsensi_siswa(docId) {
  await deleteDoc(doc(db, "Absensi_siswa", docId));
}

export async function tambahAbsensi(Tanggal, Nis, Nama, Alamat, Nohp, Kelas, Keterangan ) {
  try {
    const dokRef = await addDoc(collection(db, "Absensi_siswa"), {
     Tanggal: Tanggal,
      Nis: Nis,
      Nama: Nama,
      Alamat: Alamat,
      Nohp: Nohp,
      Kelas: Kelas,
      Keterangan: Keterangan
    });
    console.log('berhasil menambah data' + dok)
  } catch (e) {
    console.log('Gagal menambah data' + e);
  }
}

export async function ubahAbsensi(docId, Tanggal, Nis, Nama, Alamat, Nohp, Kelas, Keterangan) {
  await updateDoc(doc(db, "Absensi_siswa", docId), { 
     Tanggal: Tanggal,
      Nis: Nis,
      Nama: Nama,
      Alamat: Alamat,
      Nohp: Nohp,
      Kelas: Kelas,
      Keterangan: Keterangan
  
  });
}

export async function ambilAbsensi(docId) {
  const docRef = await doc(db, "Absensi_siswa", docId);
  const docSnap = await getDoc(docRef);
  
  return await docSnap.data();
}
