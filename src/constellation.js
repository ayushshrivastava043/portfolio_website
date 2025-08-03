// Galaxy-Inspired Chronological Timeline Constellation: Use Cases, Problems, Solutions, Designs
export function renderConstellation(targetId) {
    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Orbitron:wght@500;600&display=swap');

        .timeline-constellation-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 550px;
            gap: 28px;
            position: relative;
            background: none;
            cursor: default;
            user-select: none;
        }
        .timeline-constellation-container.draggable {
            cursor: move;
        }
        .timeline-constellation-container.dragging {
            transition: none;
            cursor: grabbing;
        }
        .timeline-constellation-wrapper {
            position: relative;
            width: 100%;
            height: 600px;
            overflow: hidden;
            background: none;
        }
        .timeline-side-panel {
            position: static;
            width: 260px;
            margin-right: 8px;
            height: 90%;
            background: rgba(20,30,50,0.98);
            border-radius: 0 18px 18px 0;
            box-shadow: 4px 0 32px #a7bfff33;
            z-index: 1000;
            padding: 32px 18px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            overflow-y: auto;
        }
        .timeline-side-panel.active {
            opacity: 1;
            pointer-events: auto;
        }
        .timeline-side-panel h3 {
            color: #b6e0fe;
            font-family: 'Orbitron', sans-serif;
            font-size: 1.4rem;
            font-weight: 600;
            margin: 0 0 8px 0;
            letter-spacing: 0.5px;
        }
        .timeline-side-panel .panel-date {
            color: #a7bfff;
            font-family: 'Inter', sans-serif;
            font-size: 1.1rem;
            font-weight: 500;
            margin-bottom: 24px;
            opacity: 0.9;
        }
        .timeline-side-panel .panel-section {
            margin-bottom: 20px;
            padding: 16px;
            background: rgba(30,40,60,0.4);
            border-radius: 12px;
            border: 1px solid rgba(167,191,255,0.1);
        }
        .timeline-side-panel .section-title {
            color: #b6e0fe;
            font-family: 'Inter', sans-serif;
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .timeline-side-panel .section-content {
            color: #e6eaff;
            font-family: 'Inter', sans-serif;
            font-size: 1rem;
            line-height: 1.6;
            margin: 0;
        }
        .timeline-side-panel .impact-metric {
            display: inline-block;
            background: rgba(167,191,255,0.1);
            padding: 4px 12px;
            border-radius: 6px;
            color: #b6e0fe;
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            font-weight: 500;
            margin-top: 12px;
        }
        .timeline-galaxy-bg {
            position: absolute;
            left: 0; top: 0; width: 100%; height: 100%;
            z-index: 0;
            pointer-events: none;
        }
        .timeline-axis {
            position: absolute;
            left: 50%;
            top: 8%;
            width: 6px;
            height: 84%;
            background: linear-gradient(180deg, #b6e0fe 0%, #a7bfff 50%, #f7e6ff 100%);
            box-shadow: 0 0 24px 6px #a7bfff99, 0 0 32px 8px #b6e0fe44;
            border-radius: 3px;
            z-index: 2;
            opacity: 0.95;
        }
        .timeline-axis-label {
            position: absolute;
            left: calc(50% + 18px);
            transform: translateY(-50%);
            font-family: 'Orbitron', sans-serif;
            font-size: 1.05rem;
            color: #b6e0fe;
            background: rgba(30,40,60,0.92);
            border-radius: 8px;
            padding: 5px 12px;
            z-index: 3;
            pointer-events: none;
            box-shadow: 0 0 8px #a7bfff33;
            min-width: 90px;
            text-align: left;
        }
        .timeline-node {
            position: absolute;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: radial-gradient(circle at 60% 40%, #fff 0%, var(--node-color, #b6e0fe) 60%, transparent 100%);
            box-shadow: 0 0 0 8px var(--node-color-glow, #b6e0fe33), 0 0 18px 2px var(--node-color, #b6e0fe);
            border: 2.5px solid var(--node-color, #b6e0fe);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: box-shadow 0.3s, border 0.3s;
            z-index: 4;
            cursor: pointer;
        }
        .timeline-node .star-shape {
            width: 32px;
            height: 32px;
            display: block;
        }
        .timeline-node:hover, .timeline-node.active {
            box-shadow: 0 0 0 16px var(--node-color-glow, #b6e0fe44), 0 0 32px 8px var(--node-color, #b6e0fe);
            border-color: #fff;
            z-index: 10;
        }
        .timeline-connector {
            position: absolute;
            width: 6px;
            background: linear-gradient(180deg, #b6e0fe 0%, #a7bfff 100%);
            z-index: 2;
            border-radius: 3px;
        }
        .timeline-graph-container {
            position: static;
            width: 110px;
            height: 84%;
            z-index: 3;
            display: flex;
            align-items: center;
            pointer-events: none;
            margin-left: 8px;
        }
        .timeline-graph-svg {
            width: 100%;
            height: 100%;
            overflow: visible;
        }
        .timeline-graph-line {
            stroke: url(#constellation-gradient);
            stroke-width: 3.5;
            fill: none;
            filter: drop-shadow(0 0 8px #b6e0fe99);
        }
        .timeline-graph-point {
            fill: #fff;
            stroke: #b6e0fe;
            stroke-width: 2.5;
            filter: drop-shadow(0 0 6px #a7bfff99);
        }
        .timeline-graph-star {
            fill: #f7e6ff;
            opacity: 0.7;
            filter: blur(1.5px) drop-shadow(0 0 8px #a7bfff99);
        }
        .timeline-graph-label {
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            font-weight: 500;
            fill: #b6e0fe;
            text-shadow: 0 0 8px #a7bfff99;
            pointer-events: none;
        }
        .timeline-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 2rem;
            color: #b6e0fe;
            text-align: center;
            margin-bottom: 20px;
            text-shadow: 0 0 20px #a7bfff99;
            pointer-events: none;
        }
        @media (max-width: 900px) {
            .timeline-constellation-container { height: 800px; }
            .timeline-side-panel { 
                width: 90vw; 
                min-width: 0; 
                padding: 24px 20px;
            }
            .timeline-graph-container { right: 0; width: 120px; }
        }
    `;
    document.head.appendChild(style);

    // Timeline data with better formatted content
    const learningNodes = [
        { 
            id: 'jan', 
            color: '#b6e0fe', 
            glow: '#a7bfff', 
            period: 'January 2025', 
            title: 'Reducing AI Fallbacks', 
            sections: [
                {
                    title: 'Challenge',
                    content: 'High fallback rate in chatbot responses was impacting user trust and session continuity.'
                },
                {
                    title: 'Solution',
                    content: 'Designed an intelligent fallback detection and recovery system using OpenAI and custom logic.'
                },
                {
                    title: 'Impact',
                    content: 'Reduced fallback rate by 40% while maintaining response quality.',
                    metric: '40% Reduction in Fallbacks'
                }
            ],
            graphValue: 1, 
            graphLabel: 'Fallbacks ↓' 
        },
        { 
            id: 'feb', 
            color: '#a7bfff', 
            glow: '#f7e6ff', 
            period: 'February 2025', 
            title: 'Automated Content Generation', 
            sections: [
                {
                    title: 'Challenge',
                    content: 'Manual video creation was time-consuming and limited scalability.'
                },
                {
                    title: 'Solution',
                    content: 'Built an end-to-end pipeline combining Midjourney for visuals, Google TTS for voice, and Minimax for video assembly.'
                },
                {
                    title: 'Impact',
                    content: 'Automated 80% of the video creation process, enabling rapid content generation.',
                    metric: '80% Process Automation'
                }
            ],
            graphValue: 2, 
            graphLabel: '80% Automation' 
        },
        { 
            id: 'mar', 
            color: '#f7e6ff', 
            glow: '#b6e0fe', 
            period: 'March 2025', 
            title: 'Intent-Driven Dialogs', 
            sections: [
                {
                    title: 'Challenge',
                    content: 'Users struggled to get relevant, personalized advice through traditional chatbot interfaces.'
                },
                {
                    title: 'Solution',
                    content: 'Developed a sophisticated intent/sub-intent recognition system with risk-aligned suggestion engine.'
                },
                {
                    title: 'Impact',
                    content: 'Achieved first successful multi-turn, context-aware dialog system with dynamic advice generation.',
                    metric: 'Multi-turn Dialog Success'
                }
            ],
            graphValue: 2.5, 
            graphLabel: 'Multi-turn Dialog' 
        },
        { 
            id: 'apr', 
            color: '#b6e0fe', 
            glow: '#a7bfff', 
            period: 'April 2025', 
            title: 'Debugging & Dev Experience', 
            sections: [
                {
                    title: 'Challenge',
                    content: 'Frequent CORS/API errors and slow debugging cycles were hampering development velocity.'
                },
                {
                    title: 'Solution',
                    content: 'Implemented automated CORS handling, added argparse CLI tools, and enabled terminal-based script execution.'
                },
                {
                    title: 'Impact',
                    content: 'Cut debugging time in half and enabled rapid prototyping capabilities.',
                    metric: '50% Faster Debugging'
                }
            ],
            graphValue: 3.2, 
            graphLabel: 'Debug Time ↓' 
        },
        { 
            id: 'may', 
            color: '#a7bfff', 
            glow: '#f7e6ff', 
            period: 'May 2025', 
            title: 'Interactive Data Visuals', 
            sections: [
                {
                    title: 'Challenge',
                    content: 'Needed engaging, interactive visualizations for complex data and timelines.'
                },
                {
                    title: 'Solution',
                    content: 'Created D3-based neural tree UI, Power BI dashboard, and implemented editable frontend components.'
                },
                {
                    title: 'Impact',
                    content: 'Delivered intuitive data visualization with automated news-driven geopolitical timelines.',
                    metric: 'Enhanced Data UX'
                }
            ],
            graphValue: 4.1, 
            graphLabel: 'UI/UX Leap' 
        },
        { 
            id: 'jun', 
            color: '#f7e6ff', 
            glow: '#b6e0fe', 
            period: 'June 2025', 
            title: 'Agentic AI & Planning', 
            sections: [
                {
                    title: 'Challenge',
                    content: 'Traditional chatbots lacked autonomous planning and goal-driven capabilities.'
                },
                {
                    title: 'Solution',
                    content: 'Explored LangGraph, implemented function calling, and developed memory tools for agentic AI.'
                },
                {
                    title: 'Impact',
                    content: 'Prototyped autonomous planning nodes, laying groundwork for self-improving AI systems.',
                    metric: 'Agentic AI Prototype'
                }
            ],
            graphValue: 5, 
            graphLabel: 'Agentic AI' 
        }
    ];

    // Calculate node positions (evenly spaced, single timeline)
    const n = learningNodes.length;
    const topMargin = 50;
    const bottomMargin = 50;
    const height = 550 - topMargin - bottomMargin;
    const nodeSpacing = height / (n - 1);
    const positions = learningNodes.map((node, i) => {
        const y = topMargin + i * nodeSpacing;
        return { y };
    });

    // Create wrapper and container
    const wrapper = document.createElement('div');
    wrapper.className = 'timeline-constellation-wrapper';
    document.getElementById(targetId).innerHTML = '';
    document.getElementById(targetId).appendChild(wrapper);

    const container = document.createElement('div');
    container.className = 'timeline-constellation-container';

    wrapper.appendChild(container);

    // Drag and drop functionality
    let isDragging = false;
    let isDraggable = false;
    let startX = 0, startY = 0;
    let translateX = 0, translateY = 0;

    // Toggle draggable state on double click
    container.addEventListener('dblclick', (e) => {
        // Don't toggle if clicking on interactive elements
        if (e.target.closest('.timeline-node') || 
            e.target.closest('.timeline-side-panel') ||
            e.target.closest('.timeline-graph-container')) {
            return;
        }

        isDraggable = !isDraggable;
        container.classList.toggle('draggable');
        
        // Reset position if disabling drag
        if (!isDraggable) {
            translateX = 0;
            translateY = 0;
            container.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }
    });

    // Mouse down event
    container.addEventListener('mousedown', (e) => {
        if (!isDraggable) return;
        
        if (e.target.closest('.timeline-node') || 
            e.target.closest('.timeline-side-panel') ||
            e.target.closest('.timeline-graph-container')) {
            return;
        }

        isDragging = true;
        container.classList.add('dragging');
        
        // Get the initial mouse position
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        
        e.preventDefault();
    });

    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        if (!isDragging || !isDraggable) return;

        // Calculate new position
        const newX = e.clientX - startX;
        const newY = e.clientY - startY;

        // Update the transform
        translateX = newX;
        translateY = newY;
        container.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });

    // Mouse up event
    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        
        isDragging = false;
        container.classList.remove('dragging');
    });

    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
        if (!isDraggable) return;
        
        if (e.target.closest('.timeline-node') || 
            e.target.closest('.timeline-side-panel') ||
            e.target.closest('.timeline-graph-container')) {
            return;
        }

        isDragging = true;
        container.classList.add('dragging');
        
        const touch = e.touches[0];
        startX = touch.clientX - translateX;
        startY = touch.clientY - translateY;
        
        e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging || !isDraggable) return;
        
        const touch = e.touches[0];
        const newX = touch.clientX - startX;
        const newY = touch.clientY - startY;

        translateX = newX;
        translateY = newY;
        container.style.transform = `translate(${translateX}px, ${translateY}px)`;
        
        e.preventDefault();
    });

    document.addEventListener('touchend', () => {
        if (!isDragging) return;
        
        isDragging = false;
        container.classList.remove('dragging');
    });

    // Side panel (hidden by default)
    const sidePanel = document.createElement('div');
    sidePanel.className = 'timeline-side-panel';
    container.appendChild(sidePanel);

    // Add galaxy/starfield background (SVG)
    const galaxyBg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    galaxyBg.setAttribute('class', 'timeline-galaxy-bg');
    galaxyBg.setAttribute('width', '100%');
    galaxyBg.setAttribute('height', '100%');
    for (let i = 0; i < 60; i++) {
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        star.setAttribute('cx', Math.random() * 100 + '%');
        star.setAttribute('cy', Math.random() * 100 + '%');
        star.setAttribute('r', Math.random() * 1.5 + 0.5);
        star.setAttribute('fill', '#fff');
        star.setAttribute('opacity', Math.random() * 0.7 + 0.2);
        galaxyBg.appendChild(star);
    }
    const nebula = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    nebula.setAttribute('cx', '70%');
    nebula.setAttribute('cy', '30%');
    nebula.setAttribute('rx', '120');
    nebula.setAttribute('ry', '60');
    nebula.setAttribute('fill', 'url(#nebula-gradient)');
    nebula.setAttribute('opacity', '0.18');
    galaxyBg.appendChild(nebula);
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const nebulaGrad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    nebulaGrad.setAttribute('id', 'nebula-gradient');
    nebulaGrad.innerHTML = `
        <stop offset="0%" stop-color="#b6e0fe"/>
        <stop offset="60%" stop-color="#a7bfff"/>
        <stop offset="100%" stop-color="#23283a"/>
    `;
    defs.appendChild(nebulaGrad);
    galaxyBg.appendChild(defs);
    container.appendChild(galaxyBg);

    // Axis
    const axis = document.createElement('div');
    axis.className = 'timeline-axis';
    container.appendChild(axis);

    // Draw connectors
    for (let i = 0; i < n - 1; i++) {
        const from = positions[i];
        const to = positions[i + 1];
        const connector = document.createElement('div');
        connector.className = 'timeline-connector';
        connector.style.left = 'calc(50% - 3px)';
        connector.style.top = (from.y + 22) + 'px';
        connector.style.height = (to.y - from.y) + 'px';
        connector.style.width = '6px';
        container.appendChild(connector);
    }

    // Draw axis period labels (right side)
    learningNodes.forEach((node, i) => {
        const pos = positions[i];
        const label = document.createElement('div');
        label.className = 'timeline-axis-label';
        label.style.top = (pos.y + 22) + 'px';
        label.textContent = node.period;
        container.appendChild(label);
    });

    // Draw nodes (colored stars)
    learningNodes.forEach((node, i) => {
        const pos = positions[i];
        // Node (star)
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'timeline-node';
        nodeDiv.style.setProperty('--node-color', node.color);
        nodeDiv.style.setProperty('--node-color-glow', node.glow);
        nodeDiv.style.left = 'calc(50% - 22px)';
        nodeDiv.style.top = (pos.y) + 'px';
        // SVG star shape
        const starSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        starSvg.setAttribute('class', 'star-shape');
        starSvg.setAttribute('viewBox', '0 0 32 32');
        starSvg.innerHTML = `<polygon points="16,2 20,12 31,12 22,19 25,30 16,23 7,30 10,19 1,12 12,12" fill="${node.color}" stroke="${node.glow}" stroke-width="1.5" filter="drop-shadow(0 0 8px ${node.glow})"/>`;
        nodeDiv.appendChild(starSvg);
        // Node interaction
        nodeDiv.addEventListener('mouseenter', () => {
            document.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('active'));
            nodeDiv.classList.add('active');
            
            const content = `
                <h3>${node.title}</h3>
                <div class='panel-date'>${node.period}</div>
                ${node.sections.map(section => `
                    <div class='panel-section'>
                        <div class='section-title'>${section.title}</div>
                        <div class='section-content'>${section.content}</div>
                        ${section.metric ? `<div class='impact-metric'>${section.metric}</div>` : ''}
                    </div>
                `).join('')}
            `;
            
            sidePanel.innerHTML = content;
            sidePanel.classList.add('active');
        });
        nodeDiv.addEventListener('mouseleave', () => {
            nodeDiv.classList.remove('active');
            sidePanel.classList.remove('active');
        });
        container.appendChild(nodeDiv);
    });

    // Draw upward trajectory constellation graph (right)
    const graphContainer = document.createElement('div');
    graphContainer.className = 'timeline-graph-container';
    graphContainer.style.height = '84%';
    graphContainer.style.top = '8%';
    graphContainer.style.right = '1%';
    graphContainer.style.position = 'absolute';
    graphContainer.style.pointerEvents = 'none';
    container.appendChild(graphContainer);

    // Prepare graph points
    const graphWidth = 140;
    const graphHeight = 0.84 * 550;
    const minVal = Math.min(...learningNodes.map(n => n.graphValue));
    const maxVal = Math.max(...learningNodes.map(n => n.graphValue));
    const yRange = maxVal - minVal || 1;
    const points = learningNodes.map((node, i) => {
        const x = (graphWidth / (n - 1)) * i + 10;
        const y = graphHeight - ((node.graphValue - minVal) / yRange) * (graphHeight - 30) - 10;
        return { x, y, label: node.graphLabel };
    });

    // Draw SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'timeline-graph-svg');
    svg.setAttribute('width', graphWidth);
    svg.setAttribute('height', graphHeight);
    // Gradient for line
    const gradDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    grad.setAttribute('id', 'constellation-gradient');
    grad.setAttribute('x1', '0%');
    grad.setAttribute('y1', '100%');
    grad.setAttribute('x2', '100%');
    grad.setAttribute('y2', '0%');
    grad.innerHTML = `
        <stop offset="0%" stop-color="#b6e0fe"/>
        <stop offset="50%" stop-color="#a7bfff"/>
        <stop offset="100%" stop-color="#f7e6ff"/>
    `;
    gradDefs.appendChild(grad);
    svg.appendChild(gradDefs);
    // Draw line
    let path = '';
    points.forEach((pt, i) => {
        path += (i === 0 ? 'M' : 'L') + pt.x + ',' + pt.y + ' ';
    });
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('d', path.trim());
    line.setAttribute('class', 'timeline-graph-line');
    svg.appendChild(line);
    // Draw points (stars) and graph labels
    points.forEach((pt, i) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pt.x);
        circle.setAttribute('cy', pt.y);
        circle.setAttribute('r', 7.5);
        circle.setAttribute('class', 'timeline-graph-point');
        svg.appendChild(circle);
        // Add graph label
        if (learningNodes[i].graphLabel) {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', pt.x + 12);
            text.setAttribute('y', pt.y - 8);
            text.setAttribute('class', 'timeline-graph-label');
            text.textContent = learningNodes[i].graphLabel;
            svg.appendChild(text);
        }
    });
    // Add extra "star" dots for constellation effect
    for (let i = 0; i < 10; i++) {
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        star.setAttribute('cx', Math.random() * graphWidth);
        star.setAttribute('cy', Math.random() * graphHeight);
        star.setAttribute('r', Math.random() * 2.5 + 1);
        star.setAttribute('class', 'timeline-graph-star');
        svg.appendChild(star);
    }
    graphContainer.appendChild(svg);

    container.appendChild(sidePanel);
    container.appendChild(graphContainer);
} 