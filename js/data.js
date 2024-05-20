// definir las categorias y sus propiedades (stock maximo y % de reposicion)
export const categorias = [
    { nombre: 'A', porcentaje: 0.6, productos: [
        { id: '000001', stockMaximo: 1000, stockActual: 0, categoria: 'A' },
        { id: '000002', stockMaximo: 800, stockActual: 0, categoria: 'A' },
        { id: '000003', stockMaximo: 1100, stockActual: 0, categoria: 'A' },
        { id: '000004', stockMaximo: 900, stockActual: 0, categoria: 'A' },
        { id: '000005', stockMaximo: 1300, stockActual: 0, categoria: 'A' }
    ]},
    { nombre: 'B', porcentaje: 0.4, productos: [
        { id: '000006', stockMaximo: 700, stockActual: 0, categoria: 'B' },
        { id: '000007', stockMaximo: 750, stockActual: 0, categoria: 'B' },
        { id: '000008', stockMaximo: 600, stockActual: 0, categoria: 'B' },
        { id: '000009', stockMaximo: 500, stockActual: 0, categoria: 'B' },
        { id: '000010', stockMaximo: 650, stockActual: 0, categoria: 'B' }
    ]},
    { nombre: 'C', porcentaje: 0.25, productos: [
        { id: '000011', stockMaximo: 450, stockActual: 0, categoria: 'C' },
        { id: '000012', stockMaximo: 400, stockActual: 0, categoria: 'C' },
        { id: '000013', stockMaximo: 300, stockActual: 0, categoria: 'C' },
        { id: '000014', stockMaximo: 350, stockActual: 0, categoria: 'C' },
        { id: '000015', stockMaximo: 200, stockActual: 0, categoria: 'C' }
    ]}
];