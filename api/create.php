<?php 
error_reporting(0);

$host = "localhost";
$user = "root";
$pass = "root";
$db   = "create";

$koneksi = mysqli_connect($host,$user,$pass,$db);

$op = $_GET['op'];
switch($op){
    case '':normal();break;
    default:normal();break;
    case 'create':create();break;
    case 'detail':detail();break;
    case 'update':update();break;
    case 'delete':delete();break;
}

function normal(){
    global $koneksi;
    $sql1 = "select * from pegawai order by id desc";
    $q1 = mysqli_query($koneksi,$sql1);
    while($r1 = mysqli_fetch_array($q1)){
        $hasil[] = array(
            'id' => $r1['id'],
            'nama' => $r1['nama'],
            'alamat' => $r1['alamat'],
            'tipe_sekolah' => $r1['tipe_sekolah'],
            'tgl_input' => $r1['tgl_input'],
            'kodepos' => $r1['kodepos'],
            'provinsi' => $r1['provinsi'],
            'kabupaten' => $r1['kabupaten'],
            'no_telp' => $r1['no_telp'],
            'email' => $r1['email'],
            'facebook' => $r1['facebook'],
            'jumlah' => $r1['jumlah']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function create(){
    global $koneksi;
    $nama = $_POST['nama'];
    $alamat = $_POST['alamat'];
    $tipe_sekolah = $_POST['tipe_sekolah'];
    $kodepos = $_POST['kodepos'];
    $provinsi = $_POST['provinsi'];
    $kabupaten = $_POST['kabupaten'];
    $no_telp = $_POST['no_telp'];
    $email = $_POST['email'];
    $facebook = $_POST['facebook'];
    $jumlah = $_POST['jumlah'];
    $hasil = "Gagal dimasukkan data";
    if( $nama and $alamat and $tipe_sekolah  and $kodepos and $provinsi and $kabupaten and $no_telp and $email and $facebook and $jumlah){
        $sql1 = "INSERT INTO pegawai( nama, alamat, tipe_sekolah, kodepos, provinsi, kabupaten, no_telp, email, facebook, jumlah) VALUES ('$nama','$alamat','$tipe_sekolah','$kodepos','$provinsi','$kabupaten','$no_telp','$email','$facebook','$jumlah')";
        $q1 = mysqli_query($koneksi,$sql1);
        if($q1){
            $hasil = "Berhasil menambahkan data";
        }
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function detail(){
    global $koneksi;
    $id = $_GET['id'];
    $sql1 = "select * from pegawai where id = '$id'";
    $q1 = mysqli_query($koneksi,$sql1);
    while($r1 = mysqli_fetch_array($q1)){
        $hasil[] = array(
            'id' => $r1['id'],
            'tipe_sekolah' => $r1['tipe_sekolah'],
            'nama' => $r1['nama'],
            'alamat' => $r1['alamat'],
            'tgl_input' => $r1['tgl_input'],
            'kodepos' => $r1['kodepos'],
            'provinsi' => $r1['provinsi'],
            'kabupaten' => $r1['kabupaten'],
            'no_telp' => $r1['no_telp'],
            'email' => $r1['email'],
            'facebook' => $r1['facebook'],
            'jumlah_siswa' => $r1['jumlah_siswa']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function update(){
    global $koneksi;
    $id = $_GET['id'];
    $nama = $_POST['nama'];
    $alamat = $_POST['alamat'];
    if($nama){
        $set[] = "nama='$nama'";
    }
    if($alamat){
        $set[] = "alamat='$alamat'";
    }
    $hasil = "Gagal melakukan update data";
    if($nama or $alamat){
        $sql1 = "update pegawai set ".implode(",",$set).",tgl_input=now() where id = '$id'";
        $q1 = mysqli_query($koneksi,$sql1);
        if($q1){
            $hasil = "Data berhasil diupdate";
        }
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function delete(){
    global $koneksi;
    $id = $_GET['id'];
    $sql1 = "delete from pegawai where id = '$id'";
    $q1 = mysqli_query($koneksi,$sql1);
    if($q1){
        $hasil = "Berhasil menghapus data";
    }else{
        $hasil = "Gagal menghapus data";
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}