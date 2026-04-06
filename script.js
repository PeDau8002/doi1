const questions = [
    { q: "VẬT LIỆU CHẮN BỨC XẠ GAMMA TỐT NHẤT?", a: "chì", code: "70" },
    { q: "HẠT NHÂN NGUYÊN TỬ GỒM PROTON VÀ...?", a: "neutron", code: "12" },
    { q: "ĐƠN VỊ ĐO LIỀU LƯỢNG HẤP THỤ BỨC XẠ?", a: "gray", code: "85" },
    { q: "KÝ HIỆU CỦA NGUYÊN TỐ URANIUM?", a: "u", code: "92" },
    { q: "QUÁ TRÌNH PHÂN CHIA HẠT NHÂN NẶNG?", a: "phân hạch", code: "44" },
    { q: "LỰC GIỮ CÁC NUCLEON TRONG HẠT NHÂN?", a: "lực tương tác mạnh", code: "19" },
    { q: "TIA PHÓNG XẠ CÓ BẢN CHẤT LÀ SÓNG ĐIỆN TỪ?", a: "gamma", code: "33" },
    { q: "PHẢN ỨNG TẠO RA NĂNG LƯỢNG MẶT TRỜI?", a: "nhiệt hạch", code: "01" },
    { q: "CHU KỲ CẦN ĐỂ LƯỢNG PHÓNG XẠ GIẢM MỘT NỬA?", a: "bán rã", code: "50" },
    { q: "THIẾT BỊ PHÁT HIỆN PHÓNG XẠ PHỔ BIẾN?", a: "geiger", code: "07" },
    { q: "TỔNG SỐ PROTON VÀ NEUTRON GỌI LÀ SỐ...?", a: "khối", code: "10" },
    { q: "NHÀ KHOA HỌC PHÁT HIỆN RA HIỆN TƯỢNG PHÓNG XẠ?", a: "becquerel", code: "18" }
];

let currentIndex = 0;
const container = document.getElementById('gameContainer');
const progressBar = document.getElementById('progressBar');

// Khởi tạo 12 lá bài
function initGame() {
    questions.forEach((item, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = `card-wrapper ${index === 0 ? 'active' : ''}`;
        wrapper.id = `wrapper-${index}`;
        
        wrapper.innerHTML = `
            <div class="card" id="card-${index}">
                <div class="card-face front">
                    <div><small>STT: ${index + 1}/12</small></div>
                    <h2>${item.q}</h2>
                    <div style="width:100%; text-align:center;">
                        <input type="text" id="input-${index}" placeholder="ĐÁP ÁN...">
                        <button class="btn-decrypt" onclick="checkAnswer(${index})">DECRYPT</button>
                    </div>
                    <small style="opacity:0.3">SECTOR: NUCLEAR_DATA</small>
                </div>
                <div class="card-face back">
                    <div style="font-size: 2rem">☢️</div>
                    <div>
                        <small>ACCESS GRANTED</small>
                        <div class="code-display" id="code-${index}">00</div>
                    </div>
                    <small>NEXT LOAD IN 5S...</small>
                </div>
            </div>
        `;
        container.appendChild(wrapper);

        // Hỗ trợ nhấn Enter cho mỗi ô input
        wrapper.querySelector('input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkAnswer(index);
        });
    });
}

function checkAnswer(index) {
    const input = document.getElementById(`input-${index}`);
    const card = document.getElementById(`card-${index}`);
    const userAnswer = input.value.toLowerCase().trim();

    if (userAnswer === questions[index].a) {
        // Quay thẻ
        card.classList.add('flipped');
        
        // Hiệu ứng số nhảy
        let count = 0;
        const codeEl = document.getElementById(`code-${index}`);
        const interval = setInterval(() => {
            codeEl.innerText = Math.floor(Math.random() * 90) + 10;
            if (++count > 15) {
                clearInterval(interval);
                codeEl.innerText = questions[index].code;
            }
        }, 40);

        // Chuyển câu sau 5 giây
        setTimeout(() => {
            nextQuestion(index);
        }, 5000);
    } else {
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 400);
    }
}

function nextQuestion(index) {
    if (index < questions.length - 1) {
        const current = document.getElementById(`wrapper-${index}`);
        const next = document.getElementById(`wrapper-${index + 1}`);

        current.classList.remove('active');
        current.classList.add('exit');
        next.classList.add('active');

        currentIndex = index + 1;
        progressBar.style.width = ((currentIndex + 1) / questions.length * 100) + '%';
    } else {
        alert("CHÚC MỪNG TỔ 4! ĐÃ GIẢI MÃ TẤT CẢ DỮ LIỆU.");
    }
}

initGame();