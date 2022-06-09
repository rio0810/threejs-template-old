import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {PointGroupDraco} from "./pointGroup";
import draco from "../static/assets/models/cube.drc";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

window.addEventListener('DOMContentLoaded', () => {
    init();
  });
  
  const init = () => {

    window.addEventListener('resize', () =>{
      const width = window.innerWidth;
      const height = window.innerHeight;

      // レンダラーのサイズを調整する
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      // カメラのアスペクト比を正す
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    const VIEWPORT_W = window.innerWidth;
    const VIEWPORT_H = window.innerHeight;
  
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer();
    // レンダラーのサイズを設定
    renderer.setSize(VIEWPORT_W, VIEWPORT_H);
    renderer.setPixelRatio(window.devicePixelRatio);
    // canvasをbodyに追加
    document.body.appendChild(renderer.domElement);
  
    // シーンを作成
    const scene = new THREE.Scene();

    // drcローダーを作成
    new PointGroupDraco(
        draco,
        scene
    );
  
    // カメラを作成
    const camera = new THREE.PerspectiveCamera(
      45,
      VIEWPORT_W / VIEWPORT_H,
      1,
      5000
    );
    camera.position.set(10,10,10);

    //OrbitControlsを作成
    const controls = new OrbitControls(camera, renderer.domElement);   

    const loader = new GLTFLoader();
    loader.load('/assets/models/cube.glb', (gltf) => {
        const modelGroup = gltf.scene;
        modelGroup.traverse((child) => {
           if (child instanceof THREE.Mesh) { 
           }
        });
        scene.add(gltf.scene);
    });
  
    // 平行光源を生成
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    //グリッドヘルパーを追加
    var size = 10;
    var step = 1;
    var gridHelper = new THREE.GridHelper(size, step);
    scene.add(gridHelper);

    const tick = () => {
      requestAnimationFrame(tick);
  
      // 描画
      renderer.render(scene, camera);
    };
    tick();
  };
