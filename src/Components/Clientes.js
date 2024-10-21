import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';
import { useNavigate } from 'react-router-dom';
import '../Styles/Clientes.css';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize] = useState(10); // Tamaño de la página fijo
  const [pageIndex, setPageIndex] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchClientes();
  }, [pageIndex]); // Solo actualiza cuando cambia la página

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/usuarios', {
        params: { page: pageIndex + 1, pageSize }, // Incrementa pageIndex para que sea 1-indexed
      });
      setClientes(response.data.usuarios || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error('Error fetching clientes', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Nombre', accessor: 'nombre' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Teléfono', accessor: 'telefono' },
      { Header: 'Dirección', accessor: 'direccion' },
      {
        Header: 'Acciones',
        accessor: 'acciones',
        Cell: ({ row }) => (
          <div>
            <button onClick={() => handleEdit(row.original._id)} className="btn btn-warning btn-sm me-2">
            <i className="bi bi-pencil"></i> {/* Ícono de editar */}
          </button>
          <button 
            onClick={() => toggleEstado(row.original._id, row.original.activo)} 
            className={`btn btn-${row.original.activo ? 'danger' : 'success'} btn-sm`}
          >
            {/* Muestra un ícono dependiendo del estado de "activo" */}
            {row.original.activo ? (
              <i className="bi bi-trash3"></i> // Ícono de desactivar
            ) : (
              <i className="bi bi-check-circle"></i> // Ícono de activar
            )}
          </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data: clientes,
      manualPagination: true,
      pageCount: Math.ceil(total / pageSize),
    },
    usePagination
  );

  const navigate = useNavigate();

  const handleEdit = (id) => {
    console.log(`Editar cliente con id: ${id}`);
    navigate(`/editar-clientes/${id}`);
  };

  const toggleEstado = async (id, estadoActual) => {
    try {
      await axios.patch(`http://localhost:5000/api/usuarios/${id}/estado`, { activo: !estadoActual });
      setClientes((prevClientes) =>
        prevClientes.map(cliente =>
          cliente._id === id ? { ...cliente, activo: !estadoActual } : cliente
        )
      );
    } catch (error) {
      console.error('Error modificando el estado', error);
    }
  };

  // Funciones para cambiar de página
  const previousPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const nextPage = () => {
    if (pageIndex < Math.ceil(total / pageSize) - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Lista de Clientes</h2>
      {loading ? (
        // Spinner de Bootstrap centrado
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div>
          <table {...getTableProps()} className="table table-striped table-bordered mt-3">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} key={column.id}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.length > 0 ? (
                page.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={row.original._id}>
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()} key={cell.column.id}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center">No hay clientes disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination">            
            <button onClick={previousPage} disabled={pageIndex === 0} className="btn btn-secondary me-2">
              {'<'}
            </button>
            <button onClick={nextPage} disabled={pageIndex >= Math.ceil(total / pageSize) - 1} className="btn btn-secondary me-2">
              {'>'}
            </button>            
            <span className="ms-2">
              Página{' '}
              <strong>
                {pageIndex + 1} de {Math.ceil(total / pageSize)}
              </strong>{' '}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
