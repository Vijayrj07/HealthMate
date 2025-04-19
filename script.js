function showContent(section) {
    document.querySelector('.cards').style.display = 'none';
    document.getElementById('content').classList.remove('hidden');

    let content = "";

    if (section === 'vitals') {
        content = `
            <h2>Check Vital Signs</h2>
            <form id="vitalsForm" class="vitals-form">
                <label>Heart Rate (bpm):</label>
                <input type="number" id="heartRate" required>

                <label>Blood Pressure (Systolic/Diastolic mmHg):</label>
                <input type="text" id="bloodPressure" placeholder="e.g., 120/80" required>

                <label>Respiratory Rate (breaths/min):</label>
                <input type="number" id="respiratoryRate" required>

                <label>Body Temperature (°C):</label>
                <input type="number" step="0.1" id="temperature" required>

                <label>SpO₂ (Oxygen Level %):</label>
                <input type="number" id="spo2" required>

                <button type="submit" class="submit-btn">Submit</button>
            </form>
            <div id="resultMessage" class="result-message"></div>
        `;

        setTimeout(() => {
            document.getElementById('vitalsForm').addEventListener('submit', handleVitalsSubmit);
        }, 100);
    } 
    else if (section === 'trends') {
        content = `
            <h2>Monitor Health Trends</h2>
            <p>Visualize your health data over time to detect early warning signs.</p>
        `;
    } 
    else if (section === 'alerts') {
        content = `
            <h2>🚨 Health Alert!</h2>
            <p>Some of your vitals are not in normal range.</p>
            <button class="consult-btn" onclick="consultDoctor()">Consult Doctor Immediately</button>
        `;
    } 
    else if (section === 'reports') {
        content = `
            <h2>Upload Health Report</h2>
            <input type="file" id="uploadReport" accept="image/*" capture="environment">
            <div id="uploadedImagePreview" class="image-preview"></div>
        `;

        setTimeout(() => {
            document.getElementById('uploadReport').addEventListener('change', previewReportImage);
        }, 100);
    }

    document.getElementById('content-text').innerHTML = content;
}

function handleVitalsSubmit(event) {
    event.preventDefault();

    const heartRate = parseInt(document.getElementById('heartRate').value);
    const bloodPressure = document.getElementById('bloodPressure').value;
    const respiratoryRate = parseInt(document.getElementById('respiratoryRate').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const spo2 = parseInt(document.getElementById('spo2').value);

    const normalHeartRate = (heartRate >= 60 && heartRate <= 100);
    const [systolic, diastolic] = bloodPressure.split('/').map(Number);
    const normalBloodPressure = (systolic >= 90 && systolic <= 120) && (diastolic >= 60 && diastolic <= 80);
    const normalRespiratoryRate = (respiratoryRate >= 12 && respiratoryRate <= 20);
    const normalTemperature = (temperature >= 36.1 && temperature <= 37.2);
    const normalSpO2 = (spo2 >= 95);

    const allNormal = normalHeartRate && normalBloodPressure && normalRespiratoryRate && normalTemperature && normalSpO2;

    if (allNormal) {
        document.getElementById('content-text').innerHTML = `
            <h2 class="success">🎉 Congratulations!! You are completely fit!</h2>
        `;
    } else {
        // Redirect to Health Alert page
        showContent('alerts');
    }
}

function consultDoctor() {
    alert("Connecting to a Doctor... 📞 Please wait.");
    // You can expand this to actually link to a call, chat, or appointment page.
}

function previewReportImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('uploadedImagePreview').innerHTML = `
                <img src="${e.target.result}" alt="Uploaded Report" style="max-width: 100%; margin-top: 20px; border-radius: 10px;">
            `;
        };
        reader.readAsDataURL(file);
    }
}

function goBack() {
    document.querySelector('.cards').style.display = 'flex';
    document.getElementById('content').classList.add('hidden');
}
