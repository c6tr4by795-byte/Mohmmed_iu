document.addEventListener('DOMContentLoaded', () => {
    const mapProvinceFilter = document.getElementById('mapProvinceFilter');
    const mapMarkers = document.querySelectorAll('.map-marker');
    const provinceRows = document.querySelectorAll('.province-row-item');
    const mapCanvas = document.getElementById('mapCanvas');
    
    const btnZoomIn = document.getElementById('btnZoomIn');
    const btnZoomOut = document.getElementById('btnZoomOut');

    // 1. نظام الفلترة الديناميكي (تصفية المناطق)
    if (mapProvinceFilter) {
        mapProvinceFilter.addEventListener('change', (e) => {
            const selectedProvince = e.target.value;

            // فلترة نقاط الخريطة
            mapMarkers.forEach(marker => {
                const markerProvince = marker.getAttribute('data-province');
                if (selectedProvince === 'all' || markerProvince === selectedProvince) {
                    marker.style.display = 'block';
                } else {
                    marker.style.display = 'none';
                }
            });

            // فلترة وتمييز القائمة الجانبية
            provinceRows.forEach(row => {
                const rowProvince = row.getAttribute('data-province');
                if (selectedProvince === 'all' || rowProvince === selectedProvince) {
                    row.style.opacity = '1';
                    if (rowProvince === selectedProvince) {
                        row.classList.add('highlighted');
                        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    } else {
                        row.classList.remove('highlighted');
                    }
                } else {
                    row.style.opacity = '0.3';
                    row.classList.remove('highlighted');
                }
            });
        });
    }

    // 2. التفاعل التبادلي: عند الضغط على نقطة في الخريطة يتم تمييزها في القائمة
    mapMarkers.forEach(marker => {
        marker.addEventListener('click', () => {
            const province = marker.getAttribute('data-province');
            if (mapProvinceFilter) {
                mapProvinceFilter.value = province;
                // إطلاق حدث التغيير يدوياً لتحديث القائمة والواجهة
                mapProvinceFilter.dispatchEvent(new Event('change'));
            }
        });
    });

    // عند الضغط على سطر المحافظة في القائمة الجانبية يتم تحديدها في الخريطة
    provinceRows.forEach(row => {
        row.addEventListener('click', () => {
            const province = row.getAttribute('data-province');
            if (mapProvinceFilter) {
                mapProvinceFilter.value = province;
                mapProvinceFilter.dispatchEvent(new Event('change'));
            }
        });
    });

    // 3. نظام محاكاة التقريب الذكي (Zoom Simulation)
    let currentZoom = 1;
    
    if (btnZoomIn && btnZoomOut && mapCanvas) {
        btnZoomIn.addEventListener('click', () => {
            if (currentZoom < 1.5) {
                currentZoom += 0.1;
                applyZoom();
            }
        });

        btnZoomOut.addEventListener('click', () => {
            if (currentZoom > 0.8) {
                currentZoom -= 0.1;
                applyZoom();
            }
        });
    }

    function applyZoom() {
        // العثور على شبكة الإحداثيات والنقاط لتكبير منظورها البصري بشكل انسيابي
        const gridLines = mapCanvas.querySelector('.map-grid-lines');
        if (gridLines) {
            gridLines.style.transform = `scale(${currentZoom})`;
            gridLines.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        }
        
        // تعديل مواضع النقاط بما يتناسب مع التقريب بشكل مرن
        mapMarkers.forEach(marker => {
            marker.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    }
});
