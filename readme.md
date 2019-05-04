# NodePOP

Iniciar proyecto

```shell
npm run dev
```

Correr script de inicio

```shell
npm run installDB
```

## Endpoints

### * GET /apiv1/anuncios
Lista todos los anuncios

**Parámetros querystring opcionales para filtros**
* **type**: Tipo de anuncio. *Valores*: venta | busqueda
* **tags**: Tags del anuncio. [Array] *Valores*: work | lifestyle | motor | mobile
* **minPrice**: Precio minimo del artículo
* **maxPrice**: Precio máximo del artículo
* **nombre**: Nombre del artículo