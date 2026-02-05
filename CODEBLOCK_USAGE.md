# Aplicar CodeBlock a los Demás Componentes

El componente `CodeBlock` ya está creado y funcionando en `CleanCode.jsx`. Para aplicarlo a los demás componentes,sigue este patrón:

## Paso 1: Importar CodeBlock

Al inicio del archivo, agregar:
```javascript
import CodeBlock from './CodeBlock';
```

## Paso 2: Reemplazar bloques <pre><code>

### Patrón ANTES:
```javascript
<pre className="text-xs text-slate-200 overflow-x-auto">
  <code>{item.code}</code>
</pre>
```

### Patrón DESPUÉS:
```javascript
<CodeBlock code={item.code} language="javascript" />
```

## Componentes a Actualizar:

### ✅ CleanCode.jsx - COMPLETADO

### Solid.jsx
- Buscar: `<pre className="text-xs text-red-100`
- Buscar: `<pre className="text-xs text-green-100`
- Reemplazar ambos con `<CodeBlock code={...} language="javascript" />`

### Patterns.jsx
- Buscar: `<pre className="text-sm text-slate-200">`
- Reemplazar con `<CodeBlock code={currentPattern.code} language="javascript" />`

### JavaPro.jsx
- Buscar: `<pre className="text-xs bg-slate-950`
- Reemplazar con `<CodeBlock code={feature.code} language="java" />`

### SpringPro.jsx
- Buscar: `<pre className="text-sm text-slate-200">`
- Reemplazar con `<CodeBlock code={item.code} language="java" />`

### ReactPro.jsx
- Buscar: `<pre className="text-sm text-slate-200">`
- Reemplazar con `<CodeBlock code={item.code} language="javascript" />`

### AngularPro.jsx
- Buscar: `<pre className="text-sm text-slate-200">`
- Reemplazar con `<CodeBlock code={item.code} language="typescript" />`

## Lenguajes Soportados

- `javascript` - Para React, JS ejemplos
- `typescript` - Para Angular
- `java` - Para Java y Spring
- `python`, `css`, `html`, `json`, etc.
