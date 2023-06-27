var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

if(window.innerWidth > 800){
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.needsUpdate = true;
};

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 2, 14);
var scene = new THREE.Scene();
var city = new THREE.Object3D();
var smoke = new THREE.Object3D();
var town = new THREE.Object3D();
var createCarPos = true;
var uSpeed = 0.001;

//fondos
var setcolor = 0xF02050;
scene.background = new THREE.color(setcolor);
scene.fog = new THREE.Fog(setcolor, 10, 16);

function mathRandom(num = 8){
    var numValue = - Math.random() * num + Math.random() * num;
    return numValue;
};

var setTintNum = true;
function setTintColor(){
    if(setTintNum){
        setTintNum = false;
        var setColor = 0x000000;
    }else{
        setTintNum = true;
        var setColor = 0x000000;
    };
    return setColor;
};

function init(){
    var segments = 2;
    for(var i = 1; i < 100; i++){
        var geometry = new THREE.CubeGeometry(1, 0, 0, segments, segments, segments);
        var material = new THREE.MeshStandardMaterial({
            color: setTintColor(),
            wireFrame: false,
            shading: THREE.SmoothShading,
            side: THREE.DoubleSide
        });
        var wmaterial = new THREE.MeshLamberMaterial({
            color: 0xFFFFFF,
            wireFrame: false,
            transparent: true,
            opacity: 0.03,
            side: THREE.DoubleSide
        });

        var cube = new THREE.Mesh(geometry, material);
        var wire = new THREE.Mesh(geometry, material);
        var floor = new THREE.Mesh(geometry, material);
        var wfloor = new THREE.Mesh(geometry, material);

        cube.add(wfloor);
        
    }
}


generateLines();
init();
animate();
