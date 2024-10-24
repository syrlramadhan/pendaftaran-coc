function scrollToDownload() {

    if ($('.section-download').length != 0) {
        $("html, body").animate({
            scrollTop: $('.section-download').offset().top
        }, 1000);
    }
}

document.querySelector('#gambarInput').addEventListener('change', function (e) {
    var fileName = e.target.files[0].name;
    var nextSibling = e.target.nextElementSibling;
    nextSibling.innerText = fileName;
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const endpoint = `https://pendaftaran-coc-api-production.up.railway.app/api/add`; // Sesuaikan dengan endpoint yang sesuai

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Menghindari form submit default

        // Mengambil nilai dari input
        const namaLengkap = document.getElementById("nama_lengkap").value;
        const email = document.getElementById('email').value;
        const telepon = document.getElementById("teleponInput").value;
        const fileInput = document.getElementById('gambarInput').files[0]; // Mengambil file yang diunggah
        
        // Cek apakah user memilih framework JS atau belum
        let framework = '';
        if (document.getElementById('jsFrameworkYa').checked) {
            framework = document.getElementById("framework").value;
        } else {
            framework = 'belum pernah menggunakan framework js';
        }

        // Data yang akan dikirim (termasuk file)
        const formData = new FormData();
        formData.append('nama_lengkap', namaLengkap);
        formData.append('email', email);
        formData.append('telepon', telepon);
        formData.append('file', fileInput);
        formData.append('framework', framework);

        // Konfigurasi untuk fetch request
        const requestOptions = {
            method: 'POST',
            body: formData
        };

        // Melakukan fetch request
        fetch(endpoint, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle response data
                console.log('Response:', data);
                if (data['message'] == 'nama') alert("Harap mengisi nama lengkap");
                if (data['message'] == 'email') alert('Harap mengisi email')
                if (data['massage'] == 'telepon') alert('Harap mengisi no telepon')
                if (data['message'] == 'success') alert("data berhasil diterima");
                // Misalnya, tambahkan logika untuk menampilkan pesan sukses atau redirect
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error, misalnya menampilkan pesan error kepada pengguna
            });
    });
});

function tampilkanFramework() {
    document.getElementById('frameworkForm').style.display = 'block';
}

function sembunyikanFramework() {
    document.getElementById('frameworkForm').style.display = 'none';
}