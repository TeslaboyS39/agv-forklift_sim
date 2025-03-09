export function getConfig() {
    return {
        areaLength: parseFloat(document.getElementById('areaLength').value) || 0,
        areaWidth: parseFloat(document.getElementById('areaWidth').value) || 0,
        agvLength: parseFloat(document.getElementById('agvLength').value) || 0,
        agvWidth: parseFloat(document.getElementById('agvWidth').value) || 0,
        agvHeight: parseFloat(document.getElementById('agvHeight').value) || 0,
        paletteLength: parseFloat(document.getElementById('paletteLength').value) || 0,
        paletteWidth: parseFloat(document.getElementById('paletteWidth').value) || 0,
        boxHeight: parseFloat(document.getElementById('boxHeight').value) || 0,
        pathWidth: parseFloat(document.getElementById('pathWidth').value) || 0,
        boxGap: parseFloat(document.getElementById('boxGap').value) || 0,
    };
}