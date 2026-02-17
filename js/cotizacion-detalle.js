        let currentStep = 1;
        let viewingStep = 1;
        let selectedClient = null;
        let quoteSaved = false;

        // Dummy client data for demo
        const clientesDemo = [
            {
                id: 'CLI001',
                codigo: 'C-00001',
                nombre: 'Minera Los Andes S.A.',
                rut: '76.123.456-7',
                pais: 'Chile',
                direcciones: [
                    'Av. Apoquindo 4500, Las Condes, Santiago',
                    'Ruta 5 Norte Km 1350, Antofagasta',
                    'Av. Industrial 2500, Calama'
                ],
                contactos: [
                    { nombre: 'Juan Pérez González', telefono: '+56 9 8765 4321', cargo: 'Gerente de Operaciones', email: 'jperez@mineralosandes.cl' },
                    { nombre: 'María Torres Silva', telefono: '+56 9 1234 5678', cargo: 'Jefe de Medio Ambiente', email: 'mtorres@mineralosandes.cl' }
                ]
            },
            {
                id: 'CLI002',
                codigo: 'C-00002',
                nombre: 'Pesquera del Sur Ltda.',
                rut: '78.456.789-0',
                pais: 'Chile',
                direcciones: [
                    'Puerto Montt, Av. Costanera 1200',
                    'Chiloé, Sector Industrial Puerto Quellon'
                ],
                contactos: [
                    { nombre: 'Pedro Martínez', telefono: '+56 9 5555 1234', cargo: 'Director Técnico', email: 'pmartinez@pesqueradelsur.cl' }
                ]
            },
            {
                id: 'CLI003',
                codigo: 'C-00003',
                nombre: 'Celulosa Arauco SpA',
                rut: '91.234.567-8',
                pais: 'Chile',
                direcciones: [
                    'Av. El Golf 150, Las Condes, Santiago',
                    'Planta Constitución, Región del Maule',
                    'Planta Valdivia, Región de Los Ríos'
                ],
                contactos: [
                    { nombre: 'Carolina Soto', telefono: '+56 9 7777 8888', cargo: 'Gerente Ambiental', email: 'csoto@arauco.cl' },
                    { nombre: 'Roberto Fuentes', telefono: '+56 9 6666 9999', cargo: 'Coordinador de Muestreos', email: 'rfuentes@arauco.cl' },
                    { nombre: 'Ana María Reyes', telefono: '+56 9 3333 2222', cargo: 'Asistente Técnico', email: 'areyes@arauco.cl' }
                ]
            },
            {
                id: 'CLI004',
                codigo: 'C-00004',
                nombre: 'Aguas Andinas S.A.',
                rut: '61.808.000-5',
                pais: 'Chile',
                direcciones: [
                    'Av. Presidente Balmaceda 1398, Santiago',
                    'Planta La Florida, Rojas Magallanes 0355'
                ],
                contactos: [
                    { nombre: 'Felipe Contreras', telefono: '+56 9 4444 5555', cargo: 'Jefe de Laboratorio', email: 'fcontreras@aguasandinas.cl' }
                ]
            },
            {
                id: 'CLI005',
                codigo: 'C-00005',
                nombre: 'ENAP Refinerías S.A.',
                rut: '87.654.300-K',
                pais: 'Chile',
                direcciones: [
                    'Av. Borgoño 25777, Concón',
                    'Refinería Aconcagua, Concón',
                    'Refinería Bío Bío, Hualpén'
                ],
                contactos: [
                    { nombre: 'Cristina Vargas', telefono: '+56 9 2222 1111', cargo: 'Ingeniero Ambiental', email: 'cvargas@enap.cl' },
                    { nombre: 'Andrés Muñoz', telefono: '+56 9 8888 7777', cargo: 'Supervisor HSE', email: 'amunoz@enap.cl' }
                ]
            }
        ];

        function nextStep(step) {
            if (!quoteSaved && currentStep === 1 && step === 2) {
                simulateSaveQuote();
            }
            // Mark current as completed
            document.querySelector(`.stepper-item[data-step="${currentStep}"]`).classList.remove('active');
            document.querySelector(`.stepper-item[data-step="${currentStep}"]`).classList.add('completed');

            // Show next panel
            currentStep = step;
            showStepPanel(currentStep);
            viewingStep = currentStep;
            document.querySelector(`.stepper-item[data-step="${currentStep}"]`).classList.add('active');
            updateStepperViewing(viewingStep);

            // Scroll to top
            window.scrollTo(0, 0);
        }

        function prevStep(step) {
            // Remove completed from current
            document.querySelector(`.stepper-item[data-step="${currentStep}"]`).classList.remove('active');

            // Show previous panel
            currentStep = step;
            showStepPanel(currentStep);
            viewingStep = currentStep;
            document.querySelector(`.stepper-item[data-step="${step}"]`).classList.remove('completed');
            document.querySelector(`.stepper-item[data-step="${step}"]`).classList.add('active');
            updateStepperViewing(viewingStep);

            // Scroll to top
            window.scrollTo(0, 0);
        }

        function showStepPanel(step) {
            var currentPanel = document.querySelector('.step-panel.active');
            if (currentPanel) {
                currentPanel.classList.remove('active');
            }
            var targetPanel = document.getElementById('step' + step);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        }

        function updateStepperViewing(step) {
            document.querySelectorAll('.stepper-item.viewing').forEach(function(item) {
                item.classList.remove('viewing');
            });
            var viewingItem = document.querySelector('.stepper-item[data-step="' + step + '"]');
            if (viewingItem) {
                viewingItem.classList.add('viewing');
            }
        }

        function goToStep(step) {
            if (step === viewingStep) return;
            var targetPanel = document.getElementById('step' + step);
            if (!targetPanel) return;

            showStepPanel(step);
            viewingStep = step;
            updateStepperViewing(viewingStep);

            window.scrollTo(0, 0);
        }

        function simulateSaveQuote() {
            quoteSaved = true;

            var quoteNumber = '650952';
            var proposalNumber = '1';
            updateSummaryQuoteNumber(quoteNumber, 'Registrado');
            updateSummaryProposal('N° ' + proposalNumber);

            var propuestaSelect = document.getElementById('ddlPropuestas');
            if (propuestaSelect) {
                var existing = Array.from(propuestaSelect.options).some(option => option.value === proposalNumber);
                if (!existing) {
                    var option = document.createElement('option');
                    option.value = proposalNumber;
                    option.textContent = 'Propuesta N° ' + proposalNumber;
                    propuestaSelect.appendChild(option);
                }
                propuestaSelect.value = proposalNumber;
            }
        }

        function applyPrefillFromUrl() {
            var params = new URLSearchParams(window.location.search);
            if (params.get('prefill') === '1') {
                applyDummyQuote();
            }
        }

        function applyDummyQuote() {
            // Prefill client and contact
            selectClient('CLI003');
            var direccion = document.getElementById('cbDireccion');
            if (direccion) {
                direccion.value = '0';
            }
            var atendedor = document.getElementById('AtendedorId');
            if (atendedor) {
                atendedor.value = '0';
                onContactChange();
            }

            // Prefill basic fields (Paso 1)
            setSelectValue('DivisionId', '500');
            setSelectValue('DepartamentoId', 'COM');
            setSelectValue('LocalidadId', 'CM');
            setInputValue('InicioVigencia', '2026-01-30');
            setInputValue('FinVigencia', '2026-02-28');
            setSelectValue('MonedaId', 'CLU');
            setSelectValue('VendedorId', 'psaavedra');
            setSelectValue('CondicionPago', 'OC con pago a 30 días');
            setInputValue('Asunto', 'Monitoreo planta - renovación 2026');

            updateSummaryDate('2026-01-30');
            updateSummaryTotal(5.32, 'CLU');

            // Set quote as already saved
            quoteSaved = true;
            updateSummaryQuoteNumber('650952', 'Registrado');
            updateSummaryProposal('N° 1');

            // Completar paso 1 y paso 2, saltar a paso 3
            nextStep(2);
            nextStep(3);

            // Precargar Paso 3: Datos propios
            setInputValue('DireccionMuestreo', 'Fundo Playa Venado - Ruta 225 Km. 16, Ensenada, 5550000 Puerto Varas, Los Lagos');
            setInputValue('LugarMuestreo', 'Fundo Playa Venado - Ruta 225 Km. 16, Ensenada, 5550000 Puerto Varas, Los Lagos');
            setSelectValue('TipoServicio', 'ETFA');
            setInputValue('CoordinacionGeneral', 'Annia Cossio');
            setInputValue('TelefonoContacto', '+56 9 52264538');
            setInputValue('DiasPactados', '15');

            // Precargar Paso 3: Evaluación económica (archivo simulado)
            prefillEvaluacionFile();

            // Precargar Paso 3: Documentos adjuntos
            prefillDocumentosAdjuntos();
        }

        /**
         * Precarga un archivo simulado en evaluación económica
         */
        function prefillEvaluacionFile() {
            var uploadArea = document.getElementById('uploadEvaluacion');
            var uploadedSection = document.getElementById('uploadedEvaluacion');
            if (!uploadArea || !uploadedSection) return;

            uploadArea.style.display = 'none';
            uploadedSection.style.display = 'flex';

            document.getElementById('evalFileName').textContent = 'Evaluacion_Economica_650952.pdf';
            document.getElementById('evalFileDate').textContent = '06-02-2026';

            var userEl = document.getElementById('NombreUsuarioSistema');
            document.getElementById('evalFileUser').textContent = userEl ? userEl.textContent.trim() : 'Cristian Toro';
            document.getElementById('evalFilePropuesta').textContent = '1';

            var iconEl = document.getElementById('evalFileIcon');
            if (iconEl) {
                iconEl.className = 'file-icon fas fa-file-pdf';
                iconEl.style.color = '#dc3545';
            }

            setInputValue('ObservacionesEvaluacion', 'Evaluación aprobada por jefatura comercial.');
        }

        /**
         * Precarga documentos adjuntos de ejemplo
         */
        function prefillDocumentosAdjuntos() {
            var tbody = document.getElementById('tbodyDocumentos');
            if (!tbody) return;

            var emptyRow = tbody.querySelector('.empty-row');
            if (emptyRow) emptyRow.remove();

            var userEl = document.getElementById('NombreUsuarioSistema');
            var userName = userEl ? userEl.textContent.trim() : 'Cristian Toro';

            var docs = [
                { name: 'Carta_Compromiso_SGS.pdf', desc: 'Carta de compromiso del servicio', fecha: '03-02-2026', usuario: userName, icon: 'fa-file-pdf', color: '#dc3545' },
                { name: 'Protocolo_Muestreo_v2.docx', desc: 'Protocolo de muestreo actualizado', fecha: '04-02-2026', usuario: 'Annia Cossio', icon: 'fa-file-word', color: '#0d6efd' },
                { name: 'Cotizacion_Referencia.xlsx', desc: 'Cotización de referencia anterior', fecha: '05-02-2026', usuario: 'Pablo Saavedra', icon: 'fa-file-excel', color: '#198754' }
            ];

            docs.forEach(function(doc, index) {
                var tr = document.createElement('tr');
                tr.setAttribute('data-doc-id', 'prefill_' + index);
                tr.innerHTML = '<td>' +
                    '<div class="doc-name">' +
                        '<i class="fas ' + doc.icon + '" style="color:' + doc.color + ';"></i>' +
                        '<span>' + doc.name + '</span>' +
                    '</div>' +
                '</td>' +
                '<td><input type="text" class="doc-description-input" value="' + doc.desc + '"></td>' +
                '<td>' + doc.fecha + '</td>' +
                '<td>' + doc.usuario + '</td>' +
                '<td>' +
                    '<div class="file-actions">' +
                        '<button type="button" class="btn-icon" title="Descargar" onclick="downloadDocumento(this)"><i class="fas fa-download"></i></button>' +
                        '<button type="button" class="btn-icon btn-icon-danger" title="Eliminar" onclick="removeDocumento(this)"><i class="fas fa-trash"></i></button>' +
                    '</div>' +
                '</td>';
                tbody.appendChild(tr);
            });
        }

        function setInputValue(id, value) {
            var el = document.getElementById(id);
            if (el) {
                el.value = value;
            }
        }

        function setSelectValue(id, value) {
            var el = document.getElementById(id);
            if (el) {
                el.value = value;
                el.dispatchEvent(new Event('change'));
            }
        }

        function openNuevoGrupoModal() {
            document.getElementById('modalNuevoGrupo').style.display = 'flex';
        }

        function closeNuevoGrupoModal() {
            document.getElementById('modalNuevoGrupo').style.display = 'none';
        }

        var currentServiceGroup = null;
        var currentServiceContext = 'lab';

        function openBuscarServiciosModal(context) {
            var modal = document.getElementById('modalBuscarServicios');
            if (modal) {
                currentServiceContext = context || 'lab';
                setDrawerContext(currentServiceContext);
                document.querySelectorAll('#modalBuscarServicios .service-select-checkbox:checked').forEach(function(cb) {
                    cb.checked = false;
                });
                if (currentServiceContext === 'field' || currentServiceContext === 'other') {
                    var producto = document.getElementById('ddlProductoServicioDrawer');
                    var presentacion = document.getElementById('ddlPresentacionServicioDrawer');
                    if (producto) producto.value = '';
                    if (presentacion) presentacion.value = '';
                }
                modal.style.display = 'flex';
                updateSelectedServicesCount();
                updateDrawerGroupSummary();
                document.body.classList.add('no-scroll');
            }
        }

        function closeBuscarServiciosModal() {
            var modal = document.getElementById('modalBuscarServicios');
            if (modal) {
                modal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }
        }

        function openResumenDrawer() {
            var drawer = document.getElementById('summaryDrawer');
            if (drawer) {
                drawer.style.display = 'flex';
                document.body.classList.add('no-scroll');
            }
        }

        function closeResumenDrawer() {
            var drawer = document.getElementById('summaryDrawer');
            if (drawer) {
                drawer.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }
        }

        function updateSelectedServicesCount() {
            var countEl = document.getElementById('selectedServicesCount');
            if (!countEl) return;

            var checked = Array.from(document.querySelectorAll('#modalBuscarServicios .service-select-checkbox:checked'));
            countEl.textContent = checked.length.toString();
        }

        function updateDrawerGroupSummary() {
            var titleEl = document.getElementById('drawerGroupTitle');
            var tagsEl = document.getElementById('drawerGroupTags');
            if (!titleEl || !tagsEl) return;

            if (currentServiceContext === 'field') {
                titleEl.textContent = 'Servicios de Muestreo y Mediciones de Terreno';
                updateDrawerFieldTags();
                return;
            }

            if (currentServiceContext === 'other') {
                titleEl.textContent = 'Otros Servicios Ecotecnos';
                updateDrawerFieldTags();
                return;
            }

            if (!currentServiceGroup) {
                titleEl.textContent = 'Grupo';
                tagsEl.innerHTML = '';
                return;
            }

            var name = currentServiceGroup.dataset.groupName || '';
            var index = Array.from(document.querySelectorAll('#divGruposServicioLab .service-group')).indexOf(currentServiceGroup) + 1;
            titleEl.textContent = 'Grupo ' + index + ': ' + name;

            var tags = currentServiceGroup.querySelectorAll('.service-tags .service-tag');
            tagsEl.innerHTML = '';
            if (tags.length) {
                tags.forEach(function(tag) {
                    var clone = tag.cloneNode(true);
                    tagsEl.appendChild(clone);
                });
            }
        }

        function updateDrawerFieldTags() {
            var tagsEl = document.getElementById('drawerGroupTags');
            if (!tagsEl) return;
            var producto = document.getElementById('ddlProductoServicioDrawer');
            var presentacion = document.getElementById('ddlPresentacionServicioDrawer');
            tagsEl.innerHTML = '';
            if (producto && producto.value) return;
            if (presentacion && presentacion.value) return;
        }

        function updateGroupRowsAndSubtotal(group) {
            if (!group) return;
            var tbody = group.querySelector('tbody');
            if (!tbody) return;

            var rows = Array.from(tbody.querySelectorAll('tr')).filter(function(tr) {
                return !tr.classList.contains('empty-row');
            });

            if (rows.length === 0) {
                tbody.innerHTML = '<tr class="empty-row"><td colspan="14" style="text-align:center;color:#9a9a9a;">Sin servicios en este grupo.</td></tr>';
                var subtotalEmpty = group.querySelector('.service-subtotal');
                if (subtotalEmpty) {
                    subtotalEmpty.textContent = 'SubTotal 0.00 / CLU';
                }
                // Actualizar resumen en cabecera
                if (typeof updateHeaderServicesSummary === 'function') {
                    updateHeaderServicesSummary();
                }
                return;
            }

            var emptyRow = tbody.querySelector('tr.empty-row');
            if (emptyRow) {
                emptyRow.remove();
            }

            var subtotal = 0;
            rows.forEach(function(tr, index) {
                var numCell = tr.querySelector('td');
                if (numCell) {
                    numCell.textContent = (index + 1).toString();
                }
                var totalCell = tr.querySelectorAll('td')[9];
                if (totalCell) {
                    var totalVal = parseFloat(totalCell.textContent.replace(',', '.')) || 0;
                    subtotal += totalVal;
                }
            });

            var subtotalEl = group.querySelector('.service-subtotal');
            if (subtotalEl) {
                subtotalEl.textContent = 'SubTotal ' + subtotal.toFixed(2) + ' / CLU';
            }
            // Actualizar resumen en cabecera
            if (typeof updateHeaderServicesSummary === 'function') {
                updateHeaderServicesSummary();
            }
        }

        function updateMuestreoRowsAndSubtotal() {
            var container = document.getElementById('divDetalleServicioMuestreo');
            if (!container) return;
            var tbody = container.querySelector('tbody');
            if (!tbody) return;
            var rows = Array.from(tbody.querySelectorAll('tr'));
            rows.forEach(function(row, index) {
                var numCell = row.querySelector('td');
                if (numCell) {
                    numCell.textContent = (index + 1).toString();
                }
                var precioCell = row.querySelectorAll('td')[3];
                var variacionInput = row.querySelector('.js-muestreo-variacion');
                var cantidadInput = row.querySelector('.js-muestreo-cantidad');
                var tipoSelect = row.querySelector('.js-muestreo-tipo');
                var precioFinalCell = row.querySelector('.js-muestreo-precio-final');
                var totalCell = row.querySelector('.js-muestreo-total');
                var precio = precioCell ? parseFloat(precioCell.textContent.replace(',', '.')) || 0 : 0;
                var variacion = variacionInput ? parseFloat(variacionInput.value.replace(',', '.')) || 0 : 0;
                var cantidad = cantidadInput ? parseFloat(cantidadInput.value.replace(',', '.')) || 0 : 0;
                var tipo = tipoSelect ? tipoSelect.value : 'FIJO';
                var precioFinal = tipo === 'PORCENTAJE'
                    ? (precio + (precio * variacion / 100))
                    : (precio + variacion);
                var total = precioFinal * cantidad;
                if (precioFinalCell) {
                    precioFinalCell.textContent = precioFinal.toFixed(2);
                }
                if (totalCell) {
                    totalCell.textContent = total.toFixed(2);
                }
            });
            var subtotalEl = container.querySelector('.service-subtotal');
            if (subtotalEl) {
                var subtotal = rows.reduce(function(sum, row) {
                    var totalCell = row.querySelectorAll('td')[8];
                    var totalVal = totalCell ? parseFloat(totalCell.textContent.replace(',', '.')) || 0 : 0;
                    return sum + totalVal;
                }, 0);
                subtotalEl.textContent = 'SubTotal ' + subtotal.toFixed(2) + ' / CLU';
            }
            // Actualizar resumen en cabecera
            if (typeof updateHeaderServicesSummary === 'function') {
                updateHeaderServicesSummary();
            }
        }

        function filterServiceCards() {
            var input = document.getElementById('txtBuscarServicioDrawer');
            var etfa = document.getElementById('chkEtfaServicios');
            var query = input ? input.value.trim().toLowerCase() : '';
            var onlyEtfa = etfa ? etfa.checked : false;
            var producto = document.getElementById('ddlProductoServicioDrawer');
            var presentacion = document.getElementById('ddlPresentacionServicioDrawer');
            var productoVal = producto ? producto.value : '';
            var presentacionVal = presentacion ? presentacion.value : '';

            var cards = Array.from(document.querySelectorAll('#modalBuscarServicios .service-card'));
            cards.forEach(function(card) {
                var matchesContext = (card.getAttribute('data-context') || 'lab') === currentServiceContext;
                var name = (card.getAttribute('data-servicio') || '').toLowerCase();
                var metodo = (card.getAttribute('data-metodo') || '').toLowerCase();
                var matchesText = !query || name.includes(query) || metodo.includes(query);
                var matchesEtfa = !onlyEtfa || card.getAttribute('data-etfa') === 'true';
                var isFieldLike = currentServiceContext === 'field' || currentServiceContext === 'other';
                var matchesProducto = !isFieldLike || !productoVal || card.getAttribute('data-product') === productoVal;
                var matchesPresentacion = !isFieldLike || !presentacionVal || card.getAttribute('data-present') === presentacionVal;
                var matches = matchesContext && matchesText && matchesEtfa && matchesProducto && matchesPresentacion;
                card.style.display = matches ? 'grid' : 'none';
            });
        }

        function addSelectedServicesToGroup() {
            if (!currentServiceGroup) return;

            var tbody = currentServiceGroup.querySelector('tbody');
            if (!tbody) return;

            // Remove empty placeholder row
            var emptyRow = tbody.querySelector('tr td[colspan]');
            if (emptyRow) {
                emptyRow.parentElement.remove();
            }

            var cards = Array.from(document.querySelectorAll('#modalBuscarServicios .service-select-checkbox:checked'))
                .map(function(cb) { return cb.closest('.service-card'); })
                .filter(Boolean);

            if (!cards.length) return;

            var currentCount = tbody.querySelectorAll('tr').length;

            cards.forEach(function(card, idx) {
                var name = card.getAttribute('data-servicio') || '';
                var metodo = card.getAttribute('data-metodo') || '';
                var ld = card.getAttribute('data-ld') || '';
                var unidad = card.getAttribute('data-unidad') || '';
                var precio = card.getAttribute('data-precio') || '0';
                var laboratorio = card.getAttribute('data-lab') || '';

                var precioNum = parseFloat(precio.replace(',', '.')) || 0;

                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td class="text-center">' + (currentCount + idx + 1) + '</td>' +
                    '<td>' + name + '</td>' +
                    '<td>' + ld + '</td>' +
                    '<td>' + metodo + '</td>' +
                    '<td>' + unidad + '</td>' +
                    '<td align="right">' + precioNum.toFixed(2) + '</td>' +
                    '<td>PORCENTAJE</td>' +
                    '<td align="right">0.00</td>' +
                    '<td align="right">1.00</td>' +
                    '<td align="right">' + precioNum.toFixed(2) + '</td>' +
                    '<td>' + laboratorio + '</td>' +
                    '<td align="right">12</td>' +
                    '<td><input type="checkbox" disabled></td>' +
                    '<td style="width:110px"><i class="fas fa-edit"></i> <i class="fas fa-trash"></i></td>';

                tbody.appendChild(tr);
            });
            updateGroupRowsAndSubtotal(currentServiceGroup);

            // reset selection
            document.querySelectorAll('#modalBuscarServicios .service-select-checkbox:checked').forEach(function(cb) {
                cb.checked = false;
            });
            updateSelectedServicesCount();
        }

        function addSelectedServicesToMuestreo() {
            var container = document.getElementById('divDetalleServicioMuestreo');
            if (!container) return;

            var selectedCards = Array.from(document.querySelectorAll('#modalBuscarServicios .service-select-checkbox:checked'))
                .map(function(cb) { return cb.closest('.service-card'); })
                .filter(function(card) { return card && card.getAttribute('data-context') === 'field'; });

            if (!selectedCards.length) return;

            var table = container.querySelector('table');
            if (!table) {
                container.innerHTML =
                    '<div class="table-responsive">' +
                        '<table class="table table-lct">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th class="text-center" style="width:40px;">#</th>' +
                                    '<th>Servicio</th>' +
                                    '<th style="width:90px;">Unidad</th>' +
                                    '<th style="width:90px;">Precio</th>' +
                                    '<th style="width:90px;">Tipo Var.</th>' +
                                    '<th style="width:90px;">Variación</th>' +
                                    '<th style="width:70px;">Cant</th>' +
                                    '<th style="width:110px;">Precio Final</th>' +
                                    '<th style="width:90px;">Total</th>' +
                                    '<th style="width:60px;"></th>' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody></tbody>' +
                        '</table>' +
                    '</div>' +
                    '<div class="service-subtotal">SubTotal 0.00 / CLU</div>';
                table = container.querySelector('table');
            }

            var tbody = table.querySelector('tbody');
            var currentCount = tbody.querySelectorAll('tr').length;

            selectedCards.forEach(function(card, idx) {
                var name = card.getAttribute('data-servicio') || '';
                var productoVal = card.getAttribute('data-product') || '';
                var presentacionVal = card.getAttribute('data-present') || '';
                var unidad = 'UND';
                var precio = '0.00';
                var tipoVar = 'FIJO';
                var variacion = '1.00';
                var cantidad = '1.00';
                var precioFinal = precio;
                var total = (parseFloat(precioFinal) * parseFloat(cantidad)).toFixed(2);
                var codeEl = card.querySelector('.service-card-code');
                var codigo = codeEl ? codeEl.textContent.trim() : '';

                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td class="text-center">' + (currentCount + idx + 1) + '</td>' +
                    '<td>' +
                        '<div class="muestreo-name">' +
                            '<span class="muestreo-name-text" data-original="' + name + '" title="Original: ' + name + '">' + name + '</span>' +
                              '<i class="fas fa-copy muestreo-duplicate" title="Duplicar"></i>' +
                              '<span class="muestreo-code">' + codigo + '</span>' +
                          '</div>' +
                        '<div class="service-tags" style="margin-top:6px;">' +
                            '<span class="service-tag">' + productoVal.toUpperCase() + '</span>' +
                            '<span class="service-tag">' + presentacionVal.toUpperCase() + '</span>' +
                        '</div>' +
                    '</td>' +
                    '<td>' + unidad + '</td>' +
                    '<td align="right">' + precio + '</td>' +
                    '<td><select class="muestreo-cell-input js-muestreo-tipo" disabled><option value="FIJO"' + (tipoVar === 'FIJO' ? ' selected' : '') + '>FIJO</option><option value="PORCENTAJE"' + (tipoVar === 'PORCENTAJE' ? ' selected' : '') + '>PORCENTAJE</option></select></td>' +
                    '<td align="right"><input type="number" min="0" step="0.01" value="' + variacion + '" class="muestreo-cell-input js-muestreo-variacion" disabled></td>' +
                    '<td align="right"><input type="number" min="1" step="1" value="' + cantidad + '" class="muestreo-cell-input js-muestreo-cantidad" disabled></td>' +
                    '<td align="right" class="js-muestreo-precio-final">' + precioFinal + '</td>' +
                    '<td align="right" class="js-muestreo-total">' + total + '</td>' +
                    '<td class="text-center"><i class="fas fa-edit muestreo-edit-row"></i>&nbsp;&nbsp;<i class="fas fa-trash"></i></td>';

                tbody.appendChild(tr);
            });

            var subtotalEl = container.querySelector('.service-subtotal');
            updateMuestreoRowsAndSubtotal();

            document.querySelectorAll('#modalBuscarServicios .service-select-checkbox:checked').forEach(function(cb) {
                cb.checked = false;
            });
            updateSelectedServicesCount();
        }

        function addSelectedServicesToOtros() {
            var container = document.getElementById('divDetalleServicioMon');
            if (!container) return;

            var selectedCards = Array.from(document.querySelectorAll('#modalBuscarServicios .service-select-checkbox:checked'))
                .map(function(cb) { return cb.closest('.service-card'); })
                .filter(function(card) { return card && card.getAttribute('data-context') === 'other'; });

            if (!selectedCards.length) return;

            var table = container.querySelector('table');
            if (!table) {
                container.innerHTML =
                    '<div class="table-responsive">' +
                        '<table class="table table-lct">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th class="text-center" style="width:40px;">#</th>' +
                                    '<th>Servicio</th>' +
                                    '<th style="width:90px;">Unidad</th>' +
                                    '<th style="width:90px;">Precio</th>' +
                                    '<th style="width:90px;">Tipo Var.</th>' +
                                    '<th style="width:90px;">Variación</th>' +
                                    '<th style="width:70px;">Cant</th>' +
                                    '<th style="width:110px;">Precio Final</th>' +
                                    '<th style="width:90px;">Total</th>' +
                                    '<th style="width:60px;"></th>' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody></tbody>' +
                        '</table>' +
                    '</div>' +
                    '<div class="service-subtotal">SubTotal 0.00 / CLU</div>';
                table = container.querySelector('table');
            }

            var tbody = table.querySelector('tbody');
            var currentCount = tbody.querySelectorAll('tr').length;

            selectedCards.forEach(function(card, idx) {
                var name = card.getAttribute('data-servicio') || '';
                var productoVal = card.getAttribute('data-product') || '';
                var presentacionVal = card.getAttribute('data-present') || '';
                var unidad = card.getAttribute('data-unidad') || 'SERV';
                var precio = card.getAttribute('data-precio') || '0.00';
                var precioNum = parseFloat(precio.replace(',', '.')) || 0;
                var tipoVar = 'FIJO';
                var variacion = '0.00';
                var cantidad = '1.00';
                var precioFinal = precioNum;
                var total = precioFinal * parseFloat(cantidad);
                var codeEl = card.querySelector('.service-card-code-pill');
                var codigo = codeEl ? codeEl.textContent.trim() : '';

                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td class="text-center">' + (currentCount + idx + 1) + '</td>' +
                    '<td>' +
                        '<div class="muestreo-name">' +
                            '<span class="muestreo-name-text" data-original="' + name + '" title="Original: ' + name + '">' + name + '</span>' +
                            '<i class="fas fa-copy muestreo-duplicate" title="Duplicar"></i>' +
                            '<span class="muestreo-code">' + codigo + '</span>' +
                        '</div>' +
                        '<div class="service-tags" style="margin-top:6px;">' +
                            '<span class="service-tag">' + (productoVal || '').toUpperCase() + '</span>' +
                            '<span class="service-tag">' + (presentacionVal || '').toUpperCase() + '</span>' +
                        '</div>' +
                    '</td>' +
                    '<td>' + unidad + '</td>' +
                    '<td align="right">' + precioNum.toFixed(2) + '</td>' +
                    '<td><select class="muestreo-cell-input js-otros-tipo" disabled><option value="FIJO"' + (tipoVar === 'FIJO' ? ' selected' : '') + '>FIJO</option><option value="PORCENTAJE"' + (tipoVar === 'PORCENTAJE' ? ' selected' : '') + '>PORCENTAJE</option></select></td>' +
                    '<td align="right"><input type="number" min="0" step="0.01" value="' + variacion + '" class="muestreo-cell-input js-otros-variacion" disabled></td>' +
                    '<td align="right"><input type="number" min="1" step="1" value="' + cantidad + '" class="muestreo-cell-input js-otros-cantidad" disabled></td>' +
                    '<td align="right" class="js-otros-precio-final">' + precioFinal.toFixed(2) + '</td>' +
                    '<td align="right" class="js-otros-total">' + total.toFixed(2) + '</td>' +
                    '<td class="text-center"><i class="fas fa-edit otros-edit-row"></i>&nbsp;&nbsp;<i class="fas fa-trash"></i></td>';

                tbody.appendChild(tr);
            });

            updateOtrosRowsAndSubtotal();

            document.querySelectorAll('#modalBuscarServicios .service-select-checkbox:checked').forEach(function(cb) {
                cb.checked = false;
            });
            updateSelectedServicesCount();
        }

        function updateOtrosRowsAndSubtotal() {
            var container = document.getElementById('divDetalleServicioMon');
            if (!container) return;
            var tbody = container.querySelector('tbody');
            if (!tbody) return;

            var rows = Array.from(tbody.querySelectorAll('tr'));
            rows.forEach(function(row, index) {
                var numCell = row.querySelector('td');
                if (numCell) {
                    numCell.textContent = (index + 1).toString();
                }
                var precioCell = row.querySelectorAll('td')[3];
                var variacionInput = row.querySelector('.js-otros-variacion');
                var cantidadInput = row.querySelector('.js-otros-cantidad');
                var tipoSelect = row.querySelector('.js-otros-tipo');
                var precioFinalCell = row.querySelector('.js-otros-precio-final');
                var totalCell = row.querySelector('.js-otros-total');
                var precio = precioCell ? parseFloat(precioCell.textContent.replace(',', '.')) || 0 : 0;
                var variacion = variacionInput ? parseFloat(variacionInput.value.replace(',', '.')) || 0 : 0;
                var cantidad = cantidadInput ? parseFloat(cantidadInput.value.replace(',', '.')) || 0 : 0;
                var tipo = tipoSelect ? tipoSelect.value : 'FIJO';
                var precioFinal = tipo === 'PORCENTAJE'
                    ? (precio + (precio * variacion / 100))
                    : (precio + variacion);
                var total = precioFinal * cantidad;
                if (precioFinalCell) {
                    precioFinalCell.textContent = precioFinal.toFixed(2);
                }
                if (totalCell) {
                    totalCell.textContent = total.toFixed(2);
                }
            });

            var subtotalEl = container.querySelector('.service-subtotal');
            if (subtotalEl) {
                var subtotal = rows.reduce(function(sum, row) {
                    var totalCell = row.querySelectorAll('td')[8];
                    var totalVal = totalCell ? parseFloat(totalCell.textContent.replace(',', '.')) || 0 : 0;
                    return sum + totalVal;
                }, 0);
                subtotalEl.textContent = 'SubTotal ' + subtotal.toFixed(2) + ' / CLU';
            }
            // Actualizar resumen en cabecera
            if (typeof updateHeaderServicesSummary === 'function') {
                updateHeaderServicesSummary();
            }
        }

        function toggleOtrosNameEdit(row, isEditing) {
            if (!row) return;
            var nameCell = row.querySelector('.muestreo-name');
            if (!nameCell) return;
            var input = nameCell.querySelector('.muestreo-name-edit');
            var span = nameCell.querySelector('.muestreo-name-text');

            if (isEditing) {
                if (span) {
                    var current = span.textContent.trim();
                    var original = span.getAttribute('data-original') || current;
                    var nameInput = document.createElement('input');
                    nameInput.type = 'text';
                    nameInput.value = current;
                    nameInput.className = 'muestreo-name-edit';
                    nameInput.setAttribute('data-original', original);
                    span.replaceWith(nameInput);
                    nameInput.focus();
                    nameInput.select();
                }
                return;
            }

            if (input) {
                var currentText = input.value.trim();
                var originalText = input.getAttribute('data-original') || currentText;
                var spanEl = document.createElement('span');
                spanEl.className = 'muestreo-name-text';
                spanEl.setAttribute('data-original', originalText);
                spanEl.textContent = currentText || originalText;
                spanEl.title = 'Original: ' + originalText;
                input.replaceWith(spanEl);
            }
        }

        function toggleMuestreoNameEdit(row, isEditing) {
            if (!row) return;
            var nameCell = row.querySelector('.muestreo-name');
            if (!nameCell) return;
            var input = nameCell.querySelector('.muestreo-name-edit');
            var span = nameCell.querySelector('.muestreo-name-text');

            if (isEditing) {
                if (span) {
                    var current = span.textContent.trim();
                    var original = span.getAttribute('data-original') || current;
                    var nameInput = document.createElement('input');
                    nameInput.type = 'text';
                    nameInput.value = current;
                    nameInput.className = 'muestreo-name-edit';
                    nameInput.setAttribute('data-original', original);
                    span.replaceWith(nameInput);
                    nameInput.focus();
                    nameInput.select();
                }
                return;
            }

            if (input) {
                var currentText = input.value.trim();
                var originalText = input.getAttribute('data-original') || currentText;
                var spanEl = document.createElement('span');
                spanEl.className = 'muestreo-name-text';
                spanEl.setAttribute('data-original', originalText);
                spanEl.textContent = currentText || originalText;
                spanEl.title = 'Original: ' + originalText;
                input.replaceWith(spanEl);
            }
        }

        function addSelectedServices() {
            if (currentServiceContext === 'field') {
                addSelectedServicesToMuestreo();
            } else if (currentServiceContext === 'other') {
                addSelectedServicesToOtros();
            } else {
                addSelectedServicesToGroup();
            }
        }

        function setDrawerContext(context) {
            var drawer = document.querySelector('.service-drawer');
            if (!drawer) return;
            if (context === 'field' || context === 'other') {
                drawer.classList.add('drawer-field');
            } else {
                drawer.classList.remove('drawer-field');
            }
            var icon = document.querySelector('.drawer-group-title i');
            if (icon) {
                icon.className = context === 'field' ? 'fas fa-map-marker-alt' : (context === 'other' ? 'fas fa-tag' : 'fas fa-pen');
            }
            document.querySelectorAll('.service-search-tabs button').forEach(function(btn) {
                btn.classList.remove('active');
            });
            var tabServicios = document.querySelector('.service-search-tabs button[data-tab="servicios"]');
            if (tabServicios) {
                tabServicios.classList.add('active');
            }
            document.querySelectorAll('.service-search-pane').forEach(function(pane) {
                pane.style.display = 'none';
            });
            var serviciosPane = document.querySelector('.service-search-pane[data-tab="servicios"]');
            if (serviciosPane) {
                serviciosPane.style.display = 'block';
            }
            filterServiceCards();
        }

        function addGrupoServicio() {
            var nombre = document.getElementById('txtNombreGrupoNuevo').value.trim();
            var producto = document.getElementById('ddlProductoGrupoNuevo').value;
            var presentacion = document.getElementById('ddlPresentacionGrupoNuevo').value;

            var grupoIndex = document.querySelectorAll('.service-group').length + 1;
            if (!nombre) {
                nombre = 'Grupo ' + grupoIndex;
            }
            if (/^grupo\b/i.test(nombre)) {
                nombre = nombre.replace(/^grupo\b\s*:?\s*/i, '');
            }

            var safeName = nombre || 'Nuevo';
            var tagsHtml = '';
            if (producto) {
                tagsHtml += '<span class="service-tag">' + producto + '</span>';
            }
            if (presentacion) {
                tagsHtml += '<span class="service-tag">' + presentacion + '</span>';
            }

            var grupoHtml =
                '<div class="service-group" data-group-name="' + safeName.replace(/"/g, '&quot;') + '">' +
                    '<div class="service-group-header">' +
                        '<div class="group-title">' +
                            '<i class="fas fa-expand-alt text-warning"></i>' +
                            'Grupo ' + grupoIndex + ': ' + safeName +
                        '</div>' +
                        '<div class="group-actions">' +
                            '<i class="fas fa-pen"></i>' +
                            '<i class="fas fa-trash"></i>' +
                            '<button class="btn btn-success btn-sm js-open-service-modal" data-context="lab"><i class="fas fa-plus"></i> Agregar servicio</button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="service-tags">' + (tagsHtml || '<span class="service-tag">Sin producto</span>') + '</div>' +
                    '<div class="table-responsive" style="padding: 10px 12px;">' +
                        '<table class="table table-lct">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th>#</th><th>Servicio</th><th>LD*</th><th>Metodología</th><th>Unidad</th><th>Precio Unit.</th>' +
                                    '<th>Tipo Var.</th><th>Variación</th><th>Cant</th><th>Total</th><th>Laboratorio</th><th>Tiempo Resp.</th><th>ETFA</th><th></th>' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody>' +
                                '<tr class="empty-row"><td colspan="14" style="text-align:center;color:#9a9a9a;">Sin servicios en este grupo.</td></tr>' +
                            '</tbody>' +
                        '</table>' +
                    '</div>' +
                    '<div class="service-subtotal">SubTotal 0.00 / CLU</div>' +
                '</div>';

            document.getElementById('divGruposServicioLab').insertAdjacentHTML('beforeend', grupoHtml);
            renumberGroups();
            closeNuevoGrupoModal();
        }

        function initGroupDataFromTitles() {
            document.querySelectorAll('#divGruposServicioLab .service-group').forEach(function(group) {
                if (!group.dataset.groupName) {
                    var titleEl = group.querySelector('.group-title');
                    if (titleEl) {
                        var text = titleEl.textContent.trim();
                        text = text.replace(/^Grupo\s+\d+\s*:\s*/i, '');
                        group.dataset.groupName = text || 'Grupo';
                    }
                }
            });
        }

        function renumberGroups() {
            var groups = document.querySelectorAll('#divGruposServicioLab .service-group');
            groups.forEach(function(group, idx) {
                var titleEl = group.querySelector('.group-title');
                if (titleEl) {
                    var name = group.dataset.groupName || titleEl.textContent.trim();
                    name = name.replace(/^Grupo\s+\d+\s*:\s*/i, '');
                    group.dataset.groupName = name;
                    titleEl.innerHTML = '<i class="fas fa-expand-alt text-warning"></i>Grupo ' + (idx + 1) + ': ' + name;
                }
            });
        }


        // Client search modal functions
        function openClientModal() {
            document.getElementById('modalBuscadorClientes').classList.add('active');
            document.getElementById('txtBuscarCliente').value = '';
            document.getElementById('txtBuscarCliente').focus();
            renderClientResults([]);
        }

        function closeClientModal() {
            document.getElementById('modalBuscadorClientes').classList.remove('active');
        }

        function searchClients(term) {
            if (!term || term.length < 2) {
                return [];
            }
            term = term.toLowerCase();
            return clientesDemo.filter(c =>
                c.nombre.toLowerCase().includes(term) ||
                c.codigo.toLowerCase().includes(term) ||
                c.rut.toLowerCase().includes(term)
            );
        }

        function renderClientResults(results) {
            const tbody = document.getElementById('tbodyResultadosClientes');

            if (results.length === 0) {
                const searchTerm = document.getElementById('txtBuscarCliente').value;
                if (searchTerm.length < 2) {
                    tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #9a9a9a;">Ingrese al menos 2 caracteres para buscar</td></tr>';
                } else {
                    tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #9a9a9a;">No se encontraron resultados</td></tr>';
                }
                return;
            }

            tbody.innerHTML = results.map((cliente, idx) => `
                <tr onclick="selectClient('${cliente.id}')" data-client-id="${cliente.id}">
                    <td>${idx + 1}</td>
                    <td>${cliente.codigo}</td>
                    <td>${cliente.nombre}</td>
                </tr>
            `).join('');
        }

        function selectClient(clientId) {
            const cliente = clientesDemo.find(c => c.id === clientId);
            if (!cliente) return;

            selectedClient = cliente;

            // Populate client data
            document.getElementById('ClienteId').value = cliente.codigo;
            document.getElementById('lblNombre').textContent = cliente.nombre;
            document.getElementById('lblCodigo').textContent = 'Código: ' + cliente.codigo;
            document.getElementById('lblRut').textContent = cliente.rut;
            document.getElementById('lblPais').textContent = cliente.pais;

            // Populate addresses dropdown
            const cbDireccion = document.getElementById('cbDireccion');
            cbDireccion.innerHTML = '<option value="">-- Seleccione dirección --</option>';
            cliente.direcciones.forEach((dir, idx) => {
                const option = document.createElement('option');
                option.value = idx;
                option.textContent = dir;
                cbDireccion.appendChild(option);
            });

            // Populate contacts dropdown (Atención a)
            const cbAtendedor = document.getElementById('AtendedorId');
            cbAtendedor.innerHTML = '<option value="">-- Seleccione --</option>';
            cliente.contactos.forEach((contacto, idx) => {
                const option = document.createElement('option');
                option.value = idx;
                option.textContent = contacto.nombre;
                cbAtendedor.appendChild(option);
            });

            // Hide search prompt and show client data card
            document.getElementById('divBuscarCliente').setAttribute('hidden', '');
            document.getElementById('divDatosCliente').removeAttribute('hidden');

            // Update summary header with client data
            updateSummaryClient({
                nombre: cliente.nombre,
                rut: cliente.rut,
                direccion: cliente.direcciones[0] || '-'
            });

            // Close modal
            closeClientModal();
        }

        function onContactChange() {
            if (!selectedClient) return;

            const cbAtendedor = document.getElementById('AtendedorId');
            const idx = cbAtendedor.value;

            if (idx === '' || idx === null) {
                document.getElementById('lblTelefono').textContent = '--';
                document.getElementById('lblCargo').textContent = '--';
                document.getElementById('lblEmail').textContent = '--';
                document.getElementById('contactTelefono').classList.add('empty');
                document.getElementById('contactCargo').classList.add('empty');
                document.getElementById('contactEmail').classList.add('empty');
                updateSummaryContact({});
                return;
            }

            const contacto = selectedClient.contactos[idx];
            if (contacto) {
                document.getElementById('lblTelefono').textContent = contacto.telefono;
                document.getElementById('lblCargo').textContent = contacto.cargo;
                document.getElementById('lblEmail').textContent = contacto.email;
                document.getElementById('contactTelefono').classList.remove('empty');
                document.getElementById('contactCargo').classList.remove('empty');
                document.getElementById('contactEmail').classList.remove('empty');
                updateSummaryContact(contacto);
            }
        }

        // Load company from localStorage
        document.addEventListener('DOMContentLoaded', function() {
            var savedCompany = localStorage.getItem('selectedCompany') || 'SGS';
            document.getElementById('companySelect').value = savedCompany;

            // Bind events
            document.getElementById('btnBuscarCliente').addEventListener('click', openClientModal);

            document.getElementById('txtBuscarCliente').addEventListener('input', function(e) {
                const results = searchClients(e.target.value);
                renderClientResults(results);
            });

            document.getElementById('AtendedorId').addEventListener('change', onContactChange);

            var btnResumen = document.getElementById('btnFloatingResumen');
            if (btnResumen) {
                btnResumen.addEventListener('click', openResumenDrawer);
            }
            var btnCerrarResumen = document.getElementById('btnCerrarResumen');
            if (btnCerrarResumen) {
                btnCerrarResumen.addEventListener('click', closeResumenDrawer);
            }
            var summaryDrawer = document.getElementById('summaryDrawer');
            if (summaryDrawer) {
                summaryDrawer.addEventListener('click', function(e) {
                    if (e.target === summaryDrawer) {
                        closeResumenDrawer();
                    }
                });
            }

            // Allow navigation to completed steps
            document.querySelectorAll('.stepper-item').forEach(function(item) {
                item.addEventListener('click', function() {
                    if (this.classList.contains('completed') || this.classList.contains('active')) {
                        var step = parseInt(this.getAttribute('data-step'), 10);
                        if (!isNaN(step)) {
                            goToStep(step);
                        }
                    }
                });
            });

            // Nuevo grupo modal events
            document.getElementById('btnAgregarNuevoGrupo').addEventListener('click', openNuevoGrupoModal);
            document.getElementById('btnCerrarModalGrupo').addEventListener('click', closeNuevoGrupoModal);
            document.getElementById('btnCancelarGrupoNuevo').addEventListener('click', closeNuevoGrupoModal);
            document.getElementById('btnGuardarGrupoNuevo').addEventListener('click', addGrupoServicio);

            // Buscador de servicios modal events
            var btnCerrarServicios2 = document.getElementById('btnCerrarModalServicios2');
            if (btnCerrarServicios2) {
                btnCerrarServicios2.addEventListener('click', closeBuscarServiciosModal);
            }
            var btnSeleccionarServicios = document.getElementById('btnSeleccionarServicios');
            if (btnSeleccionarServicios) {
                btnSeleccionarServicios.addEventListener('click', function() {
                    addSelectedServices();
                    closeBuscarServiciosModal();
                });
            }

            var modalBuscarServicios = document.getElementById('modalBuscarServicios');
            if (modalBuscarServicios) {
                modalBuscarServicios.addEventListener('click', function(e) {
                    if (e.target === modalBuscarServicios) {
                        closeBuscarServiciosModal();
                    }
                });
            }

            document.querySelectorAll('#modalBuscarServicios .service-select-checkbox').forEach(function(cb) {
                cb.addEventListener('change', updateSelectedServicesCount);
            });

            var txtBuscarServicioDrawer = document.getElementById('txtBuscarServicioDrawer');
            if (txtBuscarServicioDrawer) {
                txtBuscarServicioDrawer.addEventListener('input', filterServiceCards);
            }
            var btnBuscarServicioDrawer = document.getElementById('btnBuscarServicioDrawer');
            if (btnBuscarServicioDrawer) {
                btnBuscarServicioDrawer.addEventListener('click', function(e) {
                    e.preventDefault();
                    filterServiceCards();
                });
            }
            var chkEtfaServicios = document.getElementById('chkEtfaServicios');
            if (chkEtfaServicios) {
                chkEtfaServicios.addEventListener('change', filterServiceCards);
            }

            var ddlProductoServicioDrawer = document.getElementById('ddlProductoServicioDrawer');
            if (ddlProductoServicioDrawer) {
                ddlProductoServicioDrawer.addEventListener('change', function() {
                    updateDrawerFieldTags();
                    filterServiceCards();
                });
            }
            var ddlPresentacionServicioDrawer = document.getElementById('ddlPresentacionServicioDrawer');
            if (ddlPresentacionServicioDrawer) {
                ddlPresentacionServicioDrawer.addEventListener('change', function() {
                    updateDrawerFieldTags();
                    filterServiceCards();
                });
            }

            document.querySelectorAll('.service-search-tabs button').forEach(function(tabBtn) {
                tabBtn.addEventListener('click', function() {
                    document.querySelectorAll('.service-search-tabs button').forEach(function(btn) {
                        btn.classList.remove('active');
                    });
                    this.classList.add('active');

                    var target = this.getAttribute('data-tab');
                    document.querySelectorAll('.service-search-pane').forEach(function(pane) {
                        pane.style.display = 'none';
                    });
                    if (target) {
                        var pane = document.querySelector('.service-search-pane[data-tab="' + target + '"]');
                        if (pane) {
                            pane.style.display = 'block';
                        }
                    }
                });
            });

            // Group edit/delete actions (delegated)
            initGroupDataFromTitles();
            document.getElementById('divGruposServicioLab').addEventListener('click', function(e) {
                var serviceBtn = e.target.closest('.js-open-service-modal');
                if (serviceBtn) {
                    var context = serviceBtn.getAttribute('data-context') || 'lab';
                    currentServiceGroup = context === 'lab' ? serviceBtn.closest('.service-group') : null;
                    openBuscarServiciosModal(context);
                    return;
                }

                var rowAction = e.target.closest('i.fa-edit, i.fa-trash');
                if (rowAction && !rowAction.closest('.group-actions')) {
                    var row = rowAction.closest('tr');
                    var group = rowAction.closest('.service-group');
                    if (row && group) {
                        row.remove();
                        updateGroupRowsAndSubtotal(group);
                    }
                    return;
                }

                if (e.target.classList.contains('fa-pen') && e.target.closest('.group-actions')) {
                    var group = e.target.closest('.service-group');
                    if (!group) return;
                    if (group.querySelector('.group-edit-input')) return;

                    var titleEl = group.querySelector('.group-title');
                    var currentName = group.dataset.groupName || '';
                    var originalHtml = titleEl.innerHTML;

                    titleEl.innerHTML =
                        '<i class="fas fa-expand-alt text-warning"></i>' +
                        '<input class="group-edit-input" type="text" value="' + currentName.replace(/"/g, '&quot;') + '" />' +
                        '<span class="group-edit-actions">' +
                            '<i class="fas fa-check" data-action="save"></i>' +
                            '<i class="fas fa-times" data-action="cancel"></i>' +
                        '</span>';

                    var input = titleEl.querySelector('.group-edit-input');
                    input.focus();
                    input.setSelectionRange(input.value.length, input.value.length);

                    var finishEdit = function(save) {
                        if (save) {
                            var newName = input.value.trim();
                            if (newName) {
                                if (/^grupo\b/i.test(newName)) {
                                    newName = newName.replace(/^grupo\b\s*:?\s*/i, '');
                                }
                                group.dataset.groupName = newName;
                            }
                            renumberGroups();
                        } else {
                            titleEl.innerHTML = originalHtml;
                        }
                    };

                    titleEl.addEventListener('click', function(ev) {
                        var action = ev.target.getAttribute('data-action');
                        if (action === 'save') {
                            finishEdit(true);
                        }
                        if (action === 'cancel') {
                            finishEdit(false);
                        }
                    }, { once: true });

                    input.addEventListener('keydown', function(ev) {
                        if (ev.key === 'Enter') {
                            ev.preventDefault();
                            finishEdit(true);
                        }
                        if (ev.key === 'Escape') {
                            ev.preventDefault();
                            finishEdit(false);
                        }
                    });
                    input.addEventListener('blur', function() {
                        finishEdit(true);
                    });
                }

                if (e.target.classList.contains('fa-trash') && e.target.closest('.group-actions')) {
                    var groupToDelete = e.target.closest('.service-group');
                    if (!groupToDelete) return;
                    if (confirm('¿Eliminar este grupo?')) {
                        groupToDelete.remove();
                        renumberGroups();
                    }
                }
            });

            document.querySelectorAll('.js-open-service-modal').forEach(function(btn) {
                if (btn.closest('#divGruposServicioLab')) return;
                btn.addEventListener('click', function() {
                    var context = btn.getAttribute('data-context') || 'lab';
                    currentServiceGroup = context === 'lab' ? btn.closest('.service-group') : null;
                    openBuscarServiciosModal(context);
                });
            });

            var divDetalleServicioMuestreo = document.getElementById('divDetalleServicioMuestreo');
            if (divDetalleServicioMuestreo) {
                divDetalleServicioMuestreo.addEventListener('click', function(e) {
                    var editRow = e.target.closest('.muestreo-edit-row');
                    if (editRow) {
                        var row = editRow.closest('tr');
                        if (!row) return;
                    var isEditing = row.classList.toggle('is-editing');
                    row.querySelectorAll('.js-muestreo-variacion, .js-muestreo-cantidad, .js-muestreo-tipo').forEach(function(input) {
                        input.disabled = !isEditing;
                    });
                    toggleMuestreoNameEdit(row, isEditing);
                    editRow.classList.toggle('fa-save', isEditing);
                    editRow.classList.toggle('fa-edit', !isEditing);
                    if (!isEditing) {
                        updateMuestreoRowsAndSubtotal();
                    }
                    return;
                }
                var copy = e.target.closest('i.fa-copy');
                if (copy) {
                    var copyRow = copy.closest('tr');
                        if (copyRow && copyRow.parentElement) {
                            var cloned = copyRow.cloneNode(true);
                            copyRow.parentElement.insertBefore(cloned, copyRow.nextSibling);
                            updateMuestreoRowsAndSubtotal();
                        }
                        return;
                    }
                    var trash = e.target.closest('i.fa-trash');
                    if (trash) {
                        var row = trash.closest('tr');
                        if (row) {
                            row.remove();
                            updateMuestreoRowsAndSubtotal();
                        }
                    }
                });

                divDetalleServicioMuestreo.addEventListener('input', function(e) {
                    if (e.target.classList.contains('js-muestreo-variacion') || e.target.classList.contains('js-muestreo-cantidad') || e.target.classList.contains('js-muestreo-tipo')) {
                        updateMuestreoRowsAndSubtotal();
                    }
                });
            }

            var divDetalleServicioMon = document.getElementById('divDetalleServicioMon');
            if (divDetalleServicioMon) {
                divDetalleServicioMon.addEventListener('click', function(e) {
                    var editRow = e.target.closest('.otros-edit-row');
                    if (editRow) {
                        var row = editRow.closest('tr');
                        if (!row) return;
                        var isEditing = row.classList.toggle('is-editing');
                        row.querySelectorAll('.js-otros-variacion, .js-otros-cantidad, .js-otros-tipo').forEach(function(input) {
                            input.disabled = !isEditing;
                        });
                        toggleOtrosNameEdit(row, isEditing);
                        editRow.classList.toggle('fa-save', isEditing);
                        editRow.classList.toggle('fa-edit', !isEditing);
                        if (!isEditing) {
                            updateOtrosRowsAndSubtotal();
                        }
                        return;
                    }

                    var copy = e.target.closest('i.fa-copy');
                    if (copy) {
                        var copyRow = copy.closest('tr');
                        if (copyRow && copyRow.parentElement) {
                            var cloned = copyRow.cloneNode(true);
                            copyRow.parentElement.insertBefore(cloned, copyRow.nextSibling);
                            updateOtrosRowsAndSubtotal();
                        }
                        return;
                    }

                    var trash = e.target.closest('i.fa-trash');
                    if (trash) {
                        var row = trash.closest('tr');
                        if (row) {
                            row.remove();
                            updateOtrosRowsAndSubtotal();
                        }
                    }
                });

                divDetalleServicioMon.addEventListener('input', function(e) {
                    if (e.target.classList.contains('js-otros-variacion') || e.target.classList.contains('js-otros-cantidad') || e.target.classList.contains('js-otros-tipo')) {
                        updateOtrosRowsAndSubtotal();
                    }
                });
            }

            // Close modal on overlay click
            document.getElementById('modalBuscadorClientes').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeClientModal();
                }
            });

            // Close modal on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeClientModal();
                    closeBuscarServiciosModal();
                }
            });

            // Initialize summary updates
            initializeSummaryUpdates();

            // Inicializar barra demo en paso 1
            applyDemoStep(1);
            updateStepperViewing(viewingStep);
        });

        // Toggle Quote Summary expanded/collapsed
        function toggleQuoteSummary() {
            var el = document.getElementById('quoteSummary');
            el.classList.toggle('expanded');
            if (el.classList.contains('expanded')) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        // Initialize event listeners for summary updates
        function initializeSummaryUpdates() {
            // Update date from InicioVigencia
            var inicioVigencia = document.getElementById('InicioVigencia');
            if (inicioVigencia) {
                inicioVigencia.addEventListener('change', updateSummaryFromForm);
                updateSummaryDate(inicioVigencia.value);
            }

            // Update currency
            var monedaSelect = document.getElementById('MonedaId');
            if (monedaSelect) {
                monedaSelect.addEventListener('change', function() {
                    var currency = this.value || 'CLP';
                    document.getElementById('summaryCurrency').textContent = currency;
                });
            }

            // Update vendedor
            var vendedorSelect = document.getElementById('VendedorId');
            if (vendedorSelect) {
                vendedorSelect.addEventListener('change', function() {
                    var selectedText = this.options[this.selectedIndex].text;
                    document.getElementById('detailVendedor').textContent = selectedText !== '-- Seleccione --' ? selectedText : '-';
                });
            }

            // Update condiciones pago
            var condPagoSelect = document.getElementById('CondicionPago');
            if (condPagoSelect) {
                condPagoSelect.addEventListener('change', function() {
                    var selectedText = this.options[this.selectedIndex].text;
                    document.getElementById('detailCondPago').textContent = selectedText !== '-- Seleccione --' ? selectedText : '-';
                });
            }

            // Update vigencia
            var finVigencia = document.getElementById('FinVigencia');
            if (finVigencia && inicioVigencia) {
                var updateVigencia = function() {
                    var inicio = formatDateShort(inicioVigencia.value);
                    var fin = formatDateShort(finVigencia.value);
                    document.getElementById('detailVigencia').textContent = inicio + ' - ' + fin;
                };
                inicioVigencia.addEventListener('change', updateVigencia);
                finVigencia.addEventListener('change', updateVigencia);
                updateVigencia();
            }

            // Update propuesta selection
            var propuestaSelect = document.getElementById('ddlPropuestas');
            if (propuestaSelect) {
                propuestaSelect.addEventListener('change', function() {
                    var hasValue = this.value && this.value !== '-1';
                    var selectedText = this.options[this.selectedIndex].text;
                    updateSummaryProposal(hasValue ? selectedText : '');
                });
                if (propuestaSelect.value && propuestaSelect.value !== '-1') {
                    updateSummaryProposal(propuestaSelect.options[propuestaSelect.selectedIndex].text);
                }
            }

        }

        // Update summary from form data
        function updateSummaryFromForm() {
            var inicioVigencia = document.getElementById('InicioVigencia');
            if (inicioVigencia) {
                updateSummaryDate(inicioVigencia.value);
            }
        }

        // Update summary date display
        function updateSummaryDate(dateStr) {
            if (dateStr) {
                var formatted = formatDateShort(dateStr);
                document.getElementById('summaryDate').textContent = formatted;
            }
        }

        // Format date as DD/MM/YYYY
        function formatDateShort(dateStr) {
            if (!dateStr) return '-';
            var parts = dateStr.split('-');
            if (parts.length === 3) {
                return parts[2] + '/' + parts[1] + '/' + parts[0];
            }
            return dateStr;
        }

        // Update summary when client is selected
        function updateSummaryClient(clientData) {
            // Update compact summary
            var clientEl = document.getElementById('summaryClient');
            clientEl.textContent = clientData.nombre || 'No seleccionado';
            clientEl.classList.toggle('empty', !clientData.nombre);

            // Update detail section
            document.getElementById('detailClientName').textContent = clientData.nombre || '-';
            document.getElementById('detailClientRut').textContent = clientData.rut || '-';
            document.getElementById('detailClientAddress').textContent = clientData.direccion || '-';
        }

        // Update summary when contact is selected
        function updateSummaryContact(contactData) {
            // Update compact summary
            var contactEl = document.getElementById('summaryContact');
            contactEl.textContent = contactData.nombre || 'No seleccionado';
            contactEl.classList.toggle('empty', !contactData.nombre);

            // Update detail section
            document.getElementById('detailContactName').textContent = contactData.nombre || '-';
            document.getElementById('detailContactEmail').textContent = contactData.email || '-';
            document.getElementById('detailContactPhone').textContent = contactData.telefono || '-';
        }

        // Update quote number when saved
        function updateSummaryQuoteNumber(number, status) {
            var numberEl = document.getElementById('summaryQuoteNumber');
            var statusEl = document.getElementById('summaryStatus');

            if (number) {
                numberEl.textContent = '# ' + number;
                numberEl.classList.remove('empty');

                statusEl.classList.remove('draft');
                statusEl.innerHTML = '<i class="fas fa-check-circle"></i><span>' + (status || 'Registrado') + '</span>';
            }
        }

        // Update propuesta badge
        function updateSummaryProposal(propuesta) {
            var badgeEl = document.getElementById('summaryProposalBadge');
            var numberEl = document.getElementById('summaryProposalNumber');
            var hasValue = !!propuesta;

            numberEl.textContent = hasValue ? propuesta : '—';
            badgeEl.classList.toggle('empty', !hasValue);
        }

        // Update propuesta date badge

        // Update total amount
        function updateSummaryTotal(amount, currency) {
            document.getElementById('summaryTotal').textContent = formatNumber(amount || 0);
            if (currency) {
                document.getElementById('summaryCurrency').textContent = currency;
            }
        }

        // Format number with thousands separator
        function formatNumber(num) {
            return parseFloat(num).toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        // =============================================
        // RESUMEN DE SERVICIOS EN CABECERA EXPANDIBLE
        // =============================================

        /**
         * Actualiza el resumen de servicios en la cabecera expandible
         * Grupos de laboratorio en una línea, otros servicios individuales
         */
        function updateHeaderServicesSummary() {
            var tbody = document.getElementById('summaryServicesBody');
            if (!tbody) return;

            var services = [];
            var grandTotal = 0;
            var rowIndex = 0;

            // Recopilar GRUPOS de laboratorio (cada grupo = 1 línea)
            var labGroups = document.querySelectorAll('#divGruposServicioLab .service-group');
            labGroups.forEach(function(group) {
                var titleEl = group.querySelector('.group-title');
                var subtotalEl = group.querySelector('.service-subtotal');
                var rows = group.querySelectorAll('tbody tr:not(.empty-row)');
                var serviceCount = rows.length;

                if (serviceCount === 0) return;

                // Nombre del grupo (limpiar el texto)
                var groupName = titleEl ? titleEl.textContent.trim() : 'Grupo';
                // Quitar el icono si está en el texto
                groupName = groupName.replace(/^\s*/, '');

                // Obtener subtotal del grupo
                var subtotalText = subtotalEl ? subtotalEl.textContent : '0';
                var subtotalMatch = subtotalText.match(/[\d.,]+/);
                var groupTotal = subtotalMatch ? parseFloat(subtotalMatch[0].replace(',', '.')) || 0 : 0;

                // Obtener tags del grupo
                var tagsContainer = group.querySelector('.service-tags');
                var tags = [];
                if (tagsContainer) {
                    tagsContainer.querySelectorAll('.service-tag').forEach(function(tag) {
                        tags.push(tag.textContent.trim());
                    });
                }

                services.push({
                    type: 'lab-group',
                    name: groupName,
                    serviceCount: serviceCount,
                    total: groupTotal,
                    tags: tags,
                    icon: 'fa-flask'
                });
                grandTotal += groupTotal;
            });

            // Recopilar servicios de muestreo (cada servicio = 1 línea)
            var muestreoRows = document.querySelectorAll('#divDetalleServicioMuestreo tbody tr');
            muestreoRows.forEach(function(row) {
                var nameEl = row.querySelector('.muestreo-name-text');
                if (nameEl) {
                    var name = nameEl.textContent.trim();
                    var precioCell = row.querySelectorAll('td')[3];
                    var cantInput = row.querySelector('.js-muestreo-cantidad');
                    var variacionInput = row.querySelector('.js-muestreo-variacion');
                    var totalCell = row.querySelector('.js-muestreo-total');

                    var precio = precioCell ? parseFloat(precioCell.textContent.replace(',', '.')) || 0 : 0;
                    var cant = cantInput ? parseFloat(cantInput.value) || 1 : 1;
                    var variacion = variacionInput ? parseFloat(variacionInput.value) || 0 : 0;
                    var total = totalCell ? parseFloat(totalCell.textContent.replace(',', '.')) || 0 : 0;

                    // Obtener tags
                    var tagsContainer = row.querySelector('.service-tags');
                    var tags = [];
                    if (tagsContainer) {
                        tagsContainer.querySelectorAll('.service-tag').forEach(function(tag) {
                            tags.push(tag.textContent.trim());
                        });
                    }

                    services.push({
                        type: 'service',
                        name: name,
                        precio: precio,
                        cant: cant,
                        descuento: variacion,
                        total: total,
                        tags: tags,
                        icon: 'fa-map-marker-alt'
                    });
                    grandTotal += total;
                }
            });

            // Recopilar otros servicios (cada servicio = 1 línea)
            var otrosRows = document.querySelectorAll('#divDetalleServicioMon tbody tr');
            otrosRows.forEach(function(row) {
                var nameEl = row.querySelector('.muestreo-name-text');
                if (nameEl) {
                    var name = nameEl.textContent.trim();
                    var precioCell = row.querySelectorAll('td')[3];
                    var cantInput = row.querySelector('.js-otros-cantidad');
                    var variacionInput = row.querySelector('.js-otros-variacion');
                    var totalCell = row.querySelector('.js-otros-total');

                    var precio = precioCell ? parseFloat(precioCell.textContent.replace(',', '.')) || 0 : 0;
                    var cant = cantInput ? parseFloat(cantInput.value) || 1 : 1;
                    var variacion = variacionInput ? parseFloat(variacionInput.value) || 0 : 0;
                    var total = totalCell ? parseFloat(totalCell.textContent.replace(',', '.')) || 0 : 0;

                    // Obtener tags
                    var tagsContainer = row.querySelector('.service-tags');
                    var tags = [];
                    if (tagsContainer) {
                        tagsContainer.querySelectorAll('.service-tag').forEach(function(tag) {
                            tags.push(tag.textContent.trim());
                        });
                    }

                    services.push({
                        type: 'service',
                        name: name,
                        precio: precio,
                        cant: cant,
                        descuento: variacion,
                        total: total,
                        tags: tags,
                        icon: 'fa-tag'
                    });
                    grandTotal += total;
                }
            });

            // Generar HTML
            var html = '';
            if (services.length === 0) {
                html = '<tr class="empty-row"><td colspan="6">Sin servicios agregados</td></tr>';
            } else {
                services.forEach(function(service, index) {
                    // Tags en línea
                    var tagsHtml = '';
                    if (service.tags && service.tags.length > 0) {
                        service.tags.forEach(function(tag) {
                            tagsHtml += '<span class="service-tag">' + tag + '</span>';
                        });
                    }

                    html += '<tr>';
                    html += '<td>' + (index + 1) + '</td>';

                    if (service.type === 'lab-group') {
                        // Grupo de laboratorio: nombre + badge cantidad + tags en línea
                        // Precio unitario = total del grupo, cantidad = 1, descuento = 0
                        html += '<td><div class="service-name-inline">';
                        html += '<i class="fas ' + service.icon + '"></i> ';
                        html += '<span>' + service.name + '</span>';
                        html += '<span class="service-count-badge">' + service.serviceCount + ' servicios</span>';
                        html += tagsHtml;
                        html += '</div></td>';
                        html += '<td>' + formatNumber(service.total) + '</td>';
                        html += '<td>1</td>';
                        html += '<td>0.00</td>';
                    } else {
                        // Servicio individual: nombre + tags en línea
                        html += '<td><div class="service-name-inline">';
                        html += '<i class="fas ' + service.icon + '"></i> ';
                        html += '<span>' + service.name + '</span>';
                        html += tagsHtml;
                        html += '</div></td>';
                        html += '<td>' + formatNumber(service.precio) + '</td>';
                        html += '<td>' + service.cant + '</td>';
                        html += '<td>' + formatNumber(service.descuento) + '</td>';
                    }

                    html += '<td>' + formatNumber(service.total) + '</td>';
                    html += '</tr>';
                });
            }

            tbody.innerHTML = html;

            // Actualizar total
            var currency = document.getElementById('summaryCurrency')?.textContent || 'CLU';
            var grandTotalEl = document.getElementById('summaryGrandTotal');
            var grandCurrencyEl = document.getElementById('summaryGrandCurrency');

            if (grandTotalEl) {
                grandTotalEl.textContent = formatNumber(grandTotal);
            }
            if (grandCurrencyEl) {
                grandCurrencyEl.textContent = '/' + currency;
            }

            // También actualizar el total en la barra superior
            updateSummaryTotal(grandTotal, currency);
        }

        // Inicializar resumen de servicios cuando se carga la página
        document.addEventListener('DOMContentLoaded', function() {
            // Actualizar resumen inicial
            setTimeout(updateHeaderServicesSummary, 500);
            // Inicializar funcionalidades del Paso 3
            initEvaluacionUpload();
            initDocumentosAdjuntos();
            // Inicializar funcionalidades del Paso 5
            initAprobacionUpload();
        });

        // =============================================
        // PASO 3: EVALUACIÓN ECONÓMICA - UPLOAD
        // =============================================

        var evaluacionFile = null; // Almacena el archivo seleccionado

        function initEvaluacionUpload() {
            var uploadArea = document.getElementById('uploadEvaluacion');
            var inputFile = document.getElementById('inputEvaluacion');
            var btnSeleccionar = document.getElementById('btnSeleccionarEvaluacion');
            var btnDescargar = document.getElementById('btnDescargarEvaluacion');
            var btnEliminar = document.getElementById('btnEliminarEvaluacion');

            if (!uploadArea || !inputFile) return;

            // Click en el área o botón abre el selector
            btnSeleccionar.addEventListener('click', function(e) {
                e.stopPropagation();
                inputFile.click();
            });

            uploadArea.addEventListener('click', function() {
                inputFile.click();
            });

            // Drag & drop
            uploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });

            uploadArea.addEventListener('dragleave', function() {
                uploadArea.classList.remove('drag-over');
            });

            uploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                if (e.dataTransfer.files.length > 0) {
                    handleEvaluacionFile(e.dataTransfer.files[0]);
                }
            });

            // Selección de archivo
            inputFile.addEventListener('change', function() {
                if (inputFile.files.length > 0) {
                    handleEvaluacionFile(inputFile.files[0]);
                }
            });

            // Descargar
            if (btnDescargar) {
                btnDescargar.addEventListener('click', downloadEvaluacion);
            }

            // Eliminar
            if (btnEliminar) {
                btnEliminar.addEventListener('click', removeEvaluacion);
            }
        }

        function handleEvaluacionFile(file) {
            evaluacionFile = file;

            var uploadArea = document.getElementById('uploadEvaluacion');
            var uploadedSection = document.getElementById('uploadedEvaluacion');

            // Ocultar área de upload, mostrar archivo subido
            uploadArea.style.display = 'none';
            uploadedSection.style.display = 'flex';

            // Nombre del archivo
            document.getElementById('evalFileName').textContent = file.name;

            // Fecha actual
            var now = new Date();
            var dateStr = ('0' + now.getDate()).slice(-2) + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + now.getFullYear();
            document.getElementById('evalFileDate').textContent = dateStr;

            // Usuario actual
            var userEl = document.getElementById('NombreUsuarioSistema');
            var userName = userEl ? userEl.textContent.trim() : 'Usuario';
            document.getElementById('evalFileUser').textContent = userName;

            // Icono según tipo de archivo
            var iconEl = document.getElementById('evalFileIcon');
            var ext = file.name.split('.').pop().toLowerCase();
            iconEl.className = 'file-icon fas ';
            if (ext === 'pdf') {
                iconEl.className += 'fa-file-pdf';
                iconEl.style.color = '#dc3545';
            } else if (['xls', 'xlsx'].indexOf(ext) >= 0) {
                iconEl.className += 'fa-file-excel';
                iconEl.style.color = '#198754';
            } else if (['doc', 'docx'].indexOf(ext) >= 0) {
                iconEl.className += 'fa-file-word';
                iconEl.style.color = '#0d6efd';
            } else if (['png', 'jpg', 'jpeg'].indexOf(ext) >= 0) {
                iconEl.className += 'fa-file-image';
                iconEl.style.color = '#ef8157';
            } else {
                iconEl.className += 'fa-file-alt';
                iconEl.style.color = '#ef8157';
            }
        }

        function downloadEvaluacion() {
            if (!evaluacionFile) return;
            var url = URL.createObjectURL(evaluacionFile);
            var a = document.createElement('a');
            a.href = url;
            a.download = evaluacionFile.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        function removeEvaluacion() {
            evaluacionFile = null;

            var uploadArea = document.getElementById('uploadEvaluacion');
            var uploadedSection = document.getElementById('uploadedEvaluacion');
            var inputFile = document.getElementById('inputEvaluacion');

            uploadedSection.style.display = 'none';
            uploadArea.style.display = '';
            if (inputFile) inputFile.value = '';
        }

        // =============================================
        // PASO 3: DOCUMENTOS ADJUNTOS
        // =============================================

        var documentosFiles = {}; // { id: File }
        var docCounter = 0;

        function initDocumentosAdjuntos() {
            var btnAgregar = document.getElementById('btnAgregarDocumento');
            var inputFile = document.getElementById('inputDocumento');

            if (!btnAgregar || !inputFile) return;

            btnAgregar.addEventListener('click', function() {
                inputFile.click();
            });

            inputFile.addEventListener('change', function() {
                if (inputFile.files.length > 0) {
                    addDocumento(inputFile.files[0]);
                    inputFile.value = '';
                }
            });
        }

        function addDocumento(file) {
            docCounter++;
            var docId = 'doc_' + docCounter;
            documentosFiles[docId] = file;

            var tbody = document.getElementById('tbodyDocumentos');
            if (!tbody) return;

            // Eliminar fila vacía si existe
            var emptyRow = tbody.querySelector('.empty-row');
            if (emptyRow) emptyRow.remove();

            // Icono según extensión
            var ext = file.name.split('.').pop().toLowerCase();
            var iconClass = 'fa-file-alt';
            var iconColor = '#ef8157';
            if (ext === 'pdf') { iconClass = 'fa-file-pdf'; iconColor = '#dc3545'; }
            else if (['xls', 'xlsx'].indexOf(ext) >= 0) { iconClass = 'fa-file-excel'; iconColor = '#198754'; }
            else if (['doc', 'docx'].indexOf(ext) >= 0) { iconClass = 'fa-file-word'; iconColor = '#0d6efd'; }
            else if (['png', 'jpg', 'jpeg'].indexOf(ext) >= 0) { iconClass = 'fa-file-image'; iconColor = '#ef8157'; }

            // Fecha actual
            var now = new Date();
            var dateStr = ('0' + now.getDate()).slice(-2) + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + now.getFullYear();

            // Usuario
            var userEl = document.getElementById('NombreUsuarioSistema');
            var userName = userEl ? userEl.textContent.trim() : 'Usuario';

            var tr = document.createElement('tr');
            tr.setAttribute('data-doc-id', docId);
            tr.innerHTML = '<td>' +
                '<div class="doc-name">' +
                    '<i class="fas ' + iconClass + '" style="color:' + iconColor + ';"></i>' +
                    '<span>' + file.name + '</span>' +
                '</div>' +
            '</td>' +
            '<td><input type="text" class="doc-description-input" placeholder="Agregar descripción..."></td>' +
            '<td>' + dateStr + '</td>' +
            '<td>' + userName + '</td>' +
            '<td>' +
                '<div class="file-actions">' +
                    '<button type="button" class="btn-icon" title="Descargar" onclick="downloadDocumento(this)"><i class="fas fa-download"></i></button>' +
                    '<button type="button" class="btn-icon btn-icon-danger" title="Eliminar" onclick="removeDocumento(this)"><i class="fas fa-trash"></i></button>' +
                '</div>' +
            '</td>';

            tbody.appendChild(tr);
        }

        function removeDocumento(btn) {
            var row = btn.closest('tr');
            if (!row) return;
            var docId = row.getAttribute('data-doc-id');
            if (docId && documentosFiles[docId]) {
                delete documentosFiles[docId];
            }
            row.remove();

            // Si no quedan filas, mostrar estado vacío
            var tbody = document.getElementById('tbodyDocumentos');
            if (tbody && tbody.querySelectorAll('tr').length === 0) {
                tbody.innerHTML = '<tr class="empty-row"><td colspan="5">' +
                    '<div class="empty-state">' +
                        '<i class="fas fa-folder-open"></i>' +
                        '<span>No se encontraron documentos adjuntos</span>' +
                    '</div>' +
                '</td></tr>';
            }
        }

        function downloadDocumento(btn) {
            var row = btn.closest('tr');
            if (!row) return;
            var docId = row.getAttribute('data-doc-id');
            var file = documentosFiles[docId];
            if (!file) return;

            var url = URL.createObjectURL(file);
            var a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        // =============================================
        // PASO 4: PREVISUALIZACIÓN PDF
        // =============================================

        function refreshPdfPreview() {
            var container = document.getElementById('pdfPreviewContainer');
            var frame = document.getElementById('pdfPreviewFrame');
            if (!container || !frame) return;

            // Mostrar loading overlay
            var overlay = document.createElement('div');
            overlay.className = 'pdf-loading-overlay';
            overlay.innerHTML = '<div class="spinner"></div><span>Generando PDF...</span>';
            container.appendChild(overlay);

            // Simular regeneración
            setTimeout(function() {
                frame.src = 'descarga.pdf?t=' + Date.now();
                frame.onload = function() {
                    overlay.remove();
                    frame.onload = null;
                };
                // Fallback si onload no dispara
                setTimeout(function() {
                    if (overlay.parentNode) overlay.remove();
                }, 3000);
            }, 1000);
        }

        function downloadPdfPreview() {
            var a = document.createElement('a');
            a.href = 'descarga.pdf';
            a.download = 'Cotizacion_SGS_2026.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        // =============================================
        // PASO 5: APROBACIÓN - NOTIFICACIÓN
        // =============================================

        function sendNotification() {
            openNotifModal();
        }

        function openNotifModal() {
            var modal = document.getElementById('modalNotificacion');
            if (!modal) return;

            // Precargar datos del formulario
            var clienteNombre = document.getElementById('summaryClient');
            var contactoNombre = document.getElementById('detailContactName');
            var contactoEmail = document.getElementById('detailContactEmail');
            var quoteNumber = document.getElementById('summaryQuoteNumber');
            var vendedorEl = document.getElementById('VendedorId');

            var clienteText = clienteNombre ? clienteNombre.textContent.trim() : 'Cliente';
            var contactoText = contactoNombre ? contactoNombre.textContent.trim() : 'Contacto';
            var emailText = contactoEmail ? contactoEmail.textContent.trim() : 'cliente@empresa.cl';
            if (emailText === '-') emailText = 'cliente@empresa.cl';
            var quoteText = quoteNumber ? quoteNumber.textContent.trim() : '';
            var vendedorText = vendedorEl && vendedorEl.selectedIndex > 0 ? vendedorEl.options[vendedorEl.selectedIndex].text : 'Vendedor SGS';

            // Para
            var paraInput = document.getElementById('notifPara');
            if (paraInput) paraInput.value = contactoText + ' <' + emailText + '>';

            // CC
            var ccInput = document.getElementById('notifCC');
            if (ccInput) ccInput.value = vendedorText + ' <vendedor@sgs.com>';

            // Asunto
            var asunto = document.getElementById('notifAsunto');
            if (asunto) {
                asunto.value = 'Cotización' + (quoteText && quoteText !== 'Sin registrar' ? ' N° ' + quoteText : '') + ' — ' + clienteText + ' — SGS Chile';
            }

            // Cuerpo
            var cuerpo = document.getElementById('notifCuerpo');
            if (cuerpo) {
                cuerpo.value = 'Estimado/a ' + contactoText + ',\n\n' +
                    'Junto con saludar, adjuntamos la cotización correspondiente a los servicios solicitados para su revisión y consideración.\n\n' +
                    'El documento adjunto incluye el detalle de los servicios, condiciones comerciales y valores asociados.\n\n' +
                    'Quedamos atentos a sus comentarios o consultas.\n\n' +
                    'Saludos cordiales,\n' +
                    vendedorText + '\n' +
                    'SGS Chile S.A.';
            }

            // Adjuntos
            buildNotifAttachments();

            modal.classList.add('active');
        }

        function buildNotifAttachments() {
            var list = document.getElementById('notifAttachList');
            if (!list) return;

            list.innerHTML = '';

            // 1. Cotización PDF (siempre fijo, no se puede quitar)
            var quoteNumber = document.getElementById('summaryQuoteNumber');
            var quoteText = quoteNumber ? quoteNumber.textContent.trim() : '';
            var pdfName = 'Cotizacion' + (quoteText && quoteText !== 'Sin registrar' ? '_' + quoteText : '') + '_SGS.pdf';

            var pdfDiv = document.createElement('div');
            pdfDiv.className = 'email-attach-item primary';
            pdfDiv.setAttribute('data-attached', 'true');
            pdfDiv.innerHTML = '<i class="fas fa-file-pdf attach-icon" style="color:#dc3545;"></i>' +
                '<span class="attach-name">' + pdfName + '</span>' +
                '<span class="attach-size">245 KB</span>' +
                '<span class="attach-fixed-label">Siempre adjunto</span>';
            list.appendChild(pdfDiv);

            // 2. Evaluación económica (desde variable o desde DOM)
            var evalName = null;
            var evalSize = null;
            if (evaluacionFile) {
                evalName = evaluacionFile.name;
                evalSize = evaluacionFile.size;
            } else {
                var uploadedEval = document.getElementById('uploadedEvaluacion');
                if (uploadedEval && uploadedEval.style.display !== 'none') {
                    var nameEl = document.getElementById('evalFileName');
                    evalName = nameEl ? nameEl.textContent.trim() : null;
                }
            }
            if (evalName) {
                list.appendChild(createToggleAttach(evalName, evalSize, false));
            }

            // 3. Documentos adjuntos (desde variable o desde DOM)
            var docsAdded = false;
            var keys = Object.keys(documentosFiles);
            for (var i = 0; i < keys.length; i++) {
                var f = documentosFiles[keys[i]];
                if (f) {
                    list.appendChild(createToggleAttach(f.name, f.size, false));
                    docsAdded = true;
                }
            }

            // Si no hay archivos reales, leer de la tabla del DOM (prefill)
            if (!docsAdded) {
                var tbody = document.getElementById('tbodyDocumentos');
                if (tbody) {
                    var rows = tbody.querySelectorAll('tr:not(.empty-row)');
                    for (var r = 0; r < rows.length; r++) {
                        var docNameEl = rows[r].querySelector('.doc-name span');
                        if (docNameEl) {
                            list.appendChild(createToggleAttach(docNameEl.textContent.trim(), null, false));
                        }
                    }
                }
            }

            updateAttachCount();
        }

        function createToggleAttach(name, size, checked) {
            var fi = getFileIcon(name);
            var div = document.createElement('div');
            div.className = 'email-attach-item' + (checked ? '' : ' excluded');
            div.setAttribute('data-attached', checked ? 'true' : 'false');

            div.innerHTML = '<i class="fas ' + fi.icon + ' attach-icon" style="color:' + fi.color + ';"></i>' +
                '<span class="attach-name">' + name + '</span>' +
                '<span class="attach-size">' + formatFileSize(size) + '</span>' +
                '<label class="attach-toggle">' +
                    '<input type="checkbox"' + (checked ? ' checked' : '') + '>' +
                    '<span class="toggle-slider"></span>' +
                '</label>';

            var checkbox = div.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    div.classList.remove('excluded');
                    div.setAttribute('data-attached', 'true');
                } else {
                    div.classList.add('excluded');
                    div.setAttribute('data-attached', 'false');
                }
                updateAttachCount();
            });

            return div;
        }

        function updateAttachCount() {
            var list = document.getElementById('notifAttachList');
            var countEl = document.getElementById('notifAttachCount');
            if (!list || !countEl) return;
            var active = list.querySelectorAll('.email-attach-item[data-attached="true"]');
            countEl.textContent = active.length;
        }

        function getFileIcon(filename) {
            var ext = filename.split('.').pop().toLowerCase();
            if (ext === 'pdf') return { icon: 'fa-file-pdf', color: '#dc3545' };
            if (['xls', 'xlsx'].indexOf(ext) >= 0) return { icon: 'fa-file-excel', color: '#198754' };
            if (['doc', 'docx'].indexOf(ext) >= 0) return { icon: 'fa-file-word', color: '#0d6efd' };
            if (['png', 'jpg', 'jpeg'].indexOf(ext) >= 0) return { icon: 'fa-file-image', color: '#ef8157' };
            if (['msg', 'eml'].indexOf(ext) >= 0) return { icon: 'fa-envelope', color: '#0d6efd' };
            return { icon: 'fa-file-alt', color: '#7a7570' };
        }

        function formatFileSize(bytes) {
            if (!bytes) return '—';
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1048576) return Math.round(bytes / 1024) + ' KB';
            return (bytes / 1048576).toFixed(1) + ' MB';
        }

        var lastSentEmail = null;

        function closeNotifModal() {
            var modal = document.getElementById('modalNotificacion');
            if (!modal) return;
            modal.classList.remove('active');
            // Restaurar modo edición
            var dialog = modal.querySelector('.modal-email');
            if (dialog) dialog.classList.remove('readonly');
            var stamp = modal.querySelector('.sent-stamp');
            if (stamp) stamp.remove();
            // Restaurar footer con botones de envío
            var footer = modal.querySelector('.modal-footer');
            if (footer) {
                footer.innerHTML = '<button type="button" class="btn btn-default" onclick="closeNotifModal()">Cancelar</button>' +
                    '<button type="button" class="btn-notif-send" onclick="confirmSendNotification()"><i class="fas fa-paper-plane"></i> Enviar notificación</button>';
            }
        }

        function confirmSendNotification() {
            var btn = document.querySelector('#modalNotificacion .btn-notif-send');
            if (btn) {
                var originalHTML = btn.innerHTML;
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

                setTimeout(function() {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                    saveSentEmailSnapshot();
                    closeNotifModal();
                    showNotifSent();
                }, 1500);
            }
        }

        function saveSentEmailSnapshot() {
            var para = document.getElementById('notifPara');
            var cc = document.getElementById('notifCC');
            var asunto = document.getElementById('notifAsunto');
            var cuerpo = document.getElementById('notifCuerpo');

            // Capturar adjuntos incluidos
            var list = document.getElementById('notifAttachList');
            var adjuntos = [];
            if (list) {
                var items = list.querySelectorAll('.email-attach-item[data-attached="true"]');
                for (var i = 0; i < items.length; i++) {
                    var nameEl = items[i].querySelector('.attach-name');
                    var sizeEl = items[i].querySelector('.attach-size');
                    var iconEl = items[i].querySelector('.attach-icon');
                    adjuntos.push({
                        name: nameEl ? nameEl.textContent : '',
                        size: sizeEl ? sizeEl.textContent : '',
                        iconHtml: iconEl ? iconEl.outerHTML : '',
                        primary: items[i].classList.contains('primary')
                    });
                }
            }

            var now = new Date();
            var dateStr = ('0' + now.getDate()).slice(-2) + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + now.getFullYear();
            var timeStr = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);

            lastSentEmail = {
                para: para ? para.value : '',
                cc: cc ? cc.value : '',
                asunto: asunto ? asunto.value : '',
                cuerpo: cuerpo ? cuerpo.value : '',
                adjuntos: adjuntos,
                fechaEnvio: dateStr + ' ' + timeStr
            };
        }

        function viewSentEmail() {
            if (!lastSentEmail) return;

            var modal = document.getElementById('modalNotificacion');
            if (!modal) return;

            var dialog = modal.querySelector('.modal-email');

            // Rellenar campos con snapshot
            var para = document.getElementById('notifPara');
            var cc = document.getElementById('notifCC');
            var asunto = document.getElementById('notifAsunto');
            var cuerpo = document.getElementById('notifCuerpo');

            if (para) para.value = lastSentEmail.para;
            if (cc) cc.value = lastSentEmail.cc;
            if (asunto) asunto.value = lastSentEmail.asunto;
            if (cuerpo) cuerpo.value = lastSentEmail.cuerpo;

            // Reconstruir adjuntos como solo lectura
            var list = document.getElementById('notifAttachList');
            var countEl = document.getElementById('notifAttachCount');
            if (list) {
                list.innerHTML = '';
                for (var i = 0; i < lastSentEmail.adjuntos.length; i++) {
                    var att = lastSentEmail.adjuntos[i];
                    var div = document.createElement('div');
                    div.className = 'email-attach-item' + (att.primary ? ' primary' : '');
                    div.setAttribute('data-attached', 'true');
                    div.innerHTML = att.iconHtml +
                        '<span class="attach-name">' + att.name + '</span>' +
                        '<span class="attach-size">' + att.size + '</span>' +
                        (att.primary ? '<span class="attach-fixed-label">Siempre adjunto</span>' : '');
                    list.appendChild(div);
                }
                if (countEl) countEl.textContent = lastSentEmail.adjuntos.length;
            }

            // Agregar sello de envío
            var body = modal.querySelector('.modal-body-email');
            var existingStamp = modal.querySelector('.sent-stamp');
            if (!existingStamp && body) {
                var stamp = document.createElement('div');
                stamp.className = 'sent-stamp';
                stamp.innerHTML = '<i class="fas fa-check-circle"></i> Correo enviado el ' + lastSentEmail.fechaEnvio;
                body.insertBefore(stamp, body.firstChild);
            }

            // Modo readonly
            if (dialog) dialog.classList.add('readonly');

            // Cambiar footer a solo cerrar
            var footer = modal.querySelector('.modal-footer');
            if (footer) {
                footer.innerHTML = '<button type="button" class="btn btn-default" onclick="closeNotifModal()">Cerrar</button>';
            }

            modal.classList.add('active');
        }

        function showNotifSent() {
            var pending = document.getElementById('notifStatePending');
            var sent = document.getElementById('notifStateSent');
            if (pending) pending.style.display = 'none';
            if (sent) sent.style.display = 'flex';

            if (lastSentEmail) {
                var fechaEl = document.getElementById('Estado_Notificacion_Fecha');
                var userNotifEl = document.getElementById('Estado_Notificacion_Usuario');
                var emailEl = document.getElementById('Estado_Notificacion_Email');

                var userEl = document.getElementById('NombreUsuarioSistema');
                var userName = userEl ? userEl.textContent.trim() : 'Usuario';

                if (fechaEl) fechaEl.textContent = lastSentEmail.fechaEnvio;
                if (userNotifEl) userNotifEl.textContent = userName;

                // Extraer email del campo Para
                var emailMatch = lastSentEmail.para.match(/<([^>]+)>/);
                var emailText = emailMatch ? emailMatch[1] : lastSentEmail.para;
                if (emailEl) emailEl.textContent = emailText;
            }
        }

        // =============================================
        // PASO 5: UPLOAD ARCHIVO APROBACIÓN
        // =============================================

        var aprobacionFile = null;

        function initAprobacionUpload() {
            var uploadArea = document.getElementById('uploadAprobacion');
            var btnSeleccionar = document.getElementById('btnSeleccionarAprobacion');
            var inputFile = document.getElementById('inputAprobacionFile');

            if (!uploadArea || !inputFile) return;

            if (btnSeleccionar) {
                btnSeleccionar.addEventListener('click', function(e) {
                    e.stopPropagation();
                    inputFile.click();
                });
            }

            uploadArea.addEventListener('click', function() {
                inputFile.click();
            });

            uploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });

            uploadArea.addEventListener('dragleave', function() {
                uploadArea.classList.remove('drag-over');
            });

            uploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                if (e.dataTransfer.files.length > 0) {
                    handleAprobacionFile(e.dataTransfer.files[0]);
                }
            });

            inputFile.addEventListener('change', function() {
                if (inputFile.files.length > 0) {
                    handleAprobacionFile(inputFile.files[0]);
                    inputFile.value = '';
                }
            });
        }

        function handleAprobacionFile(file) {
            aprobacionFile = file;

            var uploadArea = document.getElementById('uploadAprobacion');
            var uploadedSection = document.getElementById('uploadedAprobacion');

            uploadArea.style.display = 'none';
            uploadedSection.style.display = '';

            document.getElementById('aprobFileName').textContent = file.name;

            var now = new Date();
            var dateStr = ('0' + now.getDate()).slice(-2) + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + now.getFullYear();
            document.getElementById('aprobFileDate').textContent = dateStr;

            var userEl = document.getElementById('NombreUsuarioSistema');
            var userName = userEl ? userEl.textContent.trim() : 'Usuario';
            document.getElementById('aprobFileUser').textContent = userName;

            var iconEl = document.getElementById('aprobFileIcon');
            var ext = file.name.split('.').pop().toLowerCase();
            iconEl.className = 'file-icon fas ';
            if (ext === 'pdf') { iconEl.className += 'fa-file-pdf'; iconEl.style.color = '#dc3545'; }
            else if (['xls', 'xlsx'].indexOf(ext) >= 0) { iconEl.className += 'fa-file-excel'; iconEl.style.color = '#198754'; }
            else if (['doc', 'docx'].indexOf(ext) >= 0) { iconEl.className += 'fa-file-word'; iconEl.style.color = '#0d6efd'; }
            else if (['png', 'jpg', 'jpeg'].indexOf(ext) >= 0) { iconEl.className += 'fa-file-image'; iconEl.style.color = '#ef8157'; }
            else if (['msg', 'eml'].indexOf(ext) >= 0) { iconEl.className += 'fa-envelope'; iconEl.style.color = '#0d6efd'; }
            else { iconEl.className += 'fa-file-alt'; iconEl.style.color = '#ef8157'; }
        }

        function downloadAprobacionFile() {
            if (!aprobacionFile) return;
            var url = URL.createObjectURL(aprobacionFile);
            var a = document.createElement('a');
            a.href = url;
            a.download = aprobacionFile.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        function removeAprobacionFile() {
            aprobacionFile = null;
            var uploadArea = document.getElementById('uploadAprobacion');
            var uploadedSection = document.getElementById('uploadedAprobacion');
            var inputFile = document.getElementById('inputAprobacionFile');

            uploadedSection.style.display = 'none';
            uploadArea.style.display = '';
            if (inputFile) inputFile.value = '';
        }

        // =============================================
        // BARRA DEMO
        // =============================================

        function closeDemoBar() {
            var bar = document.getElementById('demoBar');
            if (bar) bar.classList.add('hidden');
            document.body.classList.remove('demo-mode');
        }

        function applyDemoStep(step) {
            // Actualizar botón activo en la barra
            var btns = document.querySelectorAll('.demo-step-btn');
            btns.forEach(function(b) { b.classList.remove('active'); });
            var activeBtn = document.querySelector('.demo-step-btn[data-demo="' + step + '"]');
            if (activeBtn) activeBtn.classList.add('active');

            // Resetear estado completo
            resetDemoState();

            // Aplicar datos progresivamente
            if (step >= 1) demoPrefillStep1();
            if (step >= 2) {
                demoPrefillStep2();
                demoMarkStepCompleted(1);
            }
            if (step >= 3) {
                demoPrefillStep3();
                demoMarkStepCompleted(2);
            }
            if (step >= 4) {
                demoPrefillStep4();
                demoMarkStepCompleted(3);
            }
            if (step >= 5) {
                demoPrefillStep5();
                demoMarkStepCompleted(4);
            }
            if (step >= 6) {
                demoPrefillStep6();
                demoMarkStepCompleted(5);
            }

            // Mostrar panel del paso actual
            currentStep = step;
            viewingStep = step;
            showStepPanel(step);
            var stepperItem = document.querySelector('.stepper-item[data-step="' + step + '"]');
            if (stepperItem) stepperItem.classList.add('active');
            updateStepperViewing(step);
            window.scrollTo(0, 0);
        }

        function demoMarkStepCompleted(step) {
            var item = document.querySelector('.stepper-item[data-step="' + step + '"]');
            if (item) {
                item.classList.remove('active');
                item.classList.add('completed');
            }
        }

        function resetDemoState() {
            // Resetear stepper
            document.querySelectorAll('.stepper-item').forEach(function(item) {
                item.classList.remove('active', 'completed', 'viewing');
            });

            // Ocultar paneles
            document.querySelectorAll('.step-panel').forEach(function(p) {
                p.classList.remove('active');
            });

            // Variables globales
            currentStep = 1;
            viewingStep = 1;
            quoteSaved = false;
            lastSentEmail = null;
            evaluacionFile = null;
            aprobacionFile = null;
            documentosFiles = {};
            docCounter = 0;

            // Resetear resumen cabecera
            var qn = document.getElementById('summaryQuoteNumber');
            if (qn) { qn.textContent = 'Sin registrar'; qn.className = 'quote-number-value empty'; }
            var pb = document.getElementById('summaryProposalNumber');
            if (pb) pb.textContent = '—';
            var st = document.getElementById('summaryTotal');
            if (st) st.textContent = '0.00';
            var sc = document.getElementById('summaryCurrency');
            if (sc) sc.textContent = 'CLP';

            // Resetear notificación
            var pending = document.getElementById('notifStatePending');
            var sent = document.getElementById('notifStateSent');
            if (pending) pending.style.display = '';
            if (sent) sent.style.display = 'none';

            // Resetear evaluación económica
            var uploadArea = document.getElementById('uploadEvaluacion');
            var uploadedEval = document.getElementById('uploadedEvaluacion');
            if (uploadArea) uploadArea.style.display = '';
            if (uploadedEval) uploadedEval.style.display = 'none';

            // Resetear documentos adjuntos
            var tbody = document.getElementById('tbodyDocumentos');
            if (tbody) {
                tbody.innerHTML = '<tr class="empty-row"><td colspan="5">' +
                    '<div class="empty-state"><i class="fas fa-folder-open"></i>' +
                    '<span>No se encontraron documentos adjuntos</span></div></td></tr>';
            }

            // Resetear aprobación upload
            var uploadAprob = document.getElementById('uploadAprobacion');
            var uploadedAprob = document.getElementById('uploadedAprobacion');
            if (uploadAprob) uploadAprob.style.display = '';
            if (uploadedAprob) uploadedAprob.style.display = 'none';

            // Resetear campos aprobación
            var ddlAprob = document.getElementById('ddlAprobacion');
            if (ddlAprob) ddlAprob.value = '-1';
            var ddlProp = document.getElementById('ddlPropuestas');
            if (ddlProp) ddlProp.value = '-1';
            var fechaAprob = document.getElementById('FechaAprobacion');
            if (fechaAprob) fechaAprob.value = '';
            var comentarios = document.getElementById('Comentarios');
            if (comentarios) comentarios.value = '';

            // Resetear tabla aprobadores
            var tbodyAprob = document.getElementById('tbodyAprobadores');
            if (tbodyAprob) {
                tbodyAprob.innerHTML = '<tr class="empty-row"><td colspan="6">' +
                    '<div class="empty-state"><i class="fas fa-user-shield"></i>' +
                    '<span>Sin aprobadores asignados</span></div></td></tr>';
            }
        }

        // --- Prefill por paso ---

        function demoPrefillStep1() {
            selectClient('CLI003');
            var direccion = document.getElementById('cbDireccion');
            if (direccion) direccion.value = '0';
            var atendedor = document.getElementById('AtendedorId');
            if (atendedor) { atendedor.value = '0'; onContactChange(); }

            setSelectValue('DivisionId', '500');
            setSelectValue('DepartamentoId', 'COM');
            setSelectValue('LocalidadId', 'CM');
            setInputValue('InicioVigencia', '2026-01-30');
            setInputValue('FinVigencia', '2026-02-28');
            setSelectValue('MonedaId', 'CLU');
            setSelectValue('VendedorId', 'psaavedra');
            setSelectValue('CondicionPago', 'OC con pago a 30 días');
            setInputValue('Asunto', 'Monitoreo planta - renovación 2026');

            updateSummaryDate('2026-01-30');
        }

        function demoPrefillStep2() {
            // Simular guardado
            quoteSaved = true;
            updateSummaryQuoteNumber('650952', 'Registrado');
            updateSummaryProposal('N° 1');
            updateSummaryTotal(5.32, 'CLU');

            // Servicios ya están en HTML estático, solo actualizar resumen
            setTimeout(function() { updateHeaderServicesSummary(); }, 100);
        }

        function demoPrefillStep3() {
            // Técnica: simular selección de una sección y contenido demo
            if (typeof selectTechItem === 'function') {
                selectTechItem('antecedentes');
            }
        }

        function demoPrefillStep4() {
            setInputValue('DireccionMuestreo', 'Fundo Playa Venado - Ruta 225 Km. 16, Ensenada, 5550000 Puerto Varas, Los Lagos');
            setInputValue('LugarMuestreo', 'Fundo Playa Venado - Ruta 225 Km. 16, Ensenada, 5550000 Puerto Varas, Los Lagos');
            setSelectValue('TipoServicio', 'ETFA');
            setInputValue('CoordinacionGeneral', 'Annia Cossio');
            setInputValue('TelefonoContacto', '+56 9 52264538');
            setInputValue('DiasPactados', '15');

            prefillEvaluacionFile();
            prefillDocumentosAdjuntos();
        }

        function demoPrefillStep5() {
            var frame = document.getElementById('pdfPreviewFrame');
            if (frame) frame.src = 'descarga.pdf?t=' + Date.now();
        }

        function demoPrefillStep6() {
            // Simular notificación enviada
            lastSentEmail = {
                para: 'Carolina Soto <csoto@arauco.cl>',
                cc: 'PABLO FRANCISCO SAAVEDRA <vendedor@sgs.com>',
                asunto: 'Cotización N° # 650952 — Celulosa Arauco SpA — SGS Chile',
                cuerpo: 'Estimado/a Carolina Soto,\n\nJunto con saludar, adjuntamos la cotización correspondiente a los servicios solicitados para su revisión y consideración.\n\nEl documento adjunto incluye el detalle de los servicios, condiciones comerciales y valores asociados.\n\nQuedamos atentos a sus comentarios o consultas.\n\nSaludos cordiales,\nPABLO FRANCISCO SAAVEDRA\nSGS Chile S.A.',
                adjuntos: [
                    { name: 'Cotizacion_650952_SGS.pdf', size: '245 KB', iconHtml: '<i class="fas fa-file-pdf attach-icon" style="color:#dc3545;"></i>', primary: true }
                ],
                fechaEnvio: '07-02-2026 10:32'
            };
            showNotifSent();

            // Aprobación del cliente
            var ddlAprob = document.getElementById('ddlAprobacion');
            if (ddlAprob) ddlAprob.value = '3';
            var ddlProp = document.getElementById('ddlPropuestas');
            if (ddlProp) ddlProp.value = '1';
            var fechaAprob = document.getElementById('FechaAprobacion');
            if (fechaAprob) fechaAprob.value = '2026-02-07';
            var comentarios = document.getElementById('Comentarios');
            if (comentarios) comentarios.value = 'Cotización aprobada. Proceder con la ejecución del servicio según lo acordado.';

            // Simular archivo de respaldo subido
            var uploadAprob = document.getElementById('uploadAprobacion');
            var uploadedAprob = document.getElementById('uploadedAprobacion');
            if (uploadAprob) uploadAprob.style.display = 'none';
            if (uploadedAprob) {
                uploadedAprob.style.display = '';
                var nameEl = document.getElementById('aprobFileName');
                var dateEl = document.getElementById('aprobFileDate');
                var userEl = document.getElementById('aprobFileUser');
                var iconEl = document.getElementById('aprobFileIcon');
                if (nameEl) nameEl.textContent = 'Aprobacion_Cliente_Arauco.msg';
                if (dateEl) dateEl.textContent = '07-02-2026';
                if (userEl) userEl.textContent = 'Pablo Saavedra';
                if (iconEl) { iconEl.className = 'file-icon fas fa-envelope'; iconEl.style.color = '#0d6efd'; }
            }

            // Tabla aprobadores
            var tbodyAprob = document.getElementById('tbodyAprobadores');
            if (tbodyAprob) {
                tbodyAprob.innerHTML = '';
                var aprobadores = [
                    { rol: 'Jefe Comercial', nombre: 'Viviana Lopez Oyarce', fecha: '07-02-2026', comentario: 'Aprobado, márgenes correctos.', estado: 'approved', estadoText: 'Aprobado' },
                    { rol: 'Gerente Área', nombre: 'Ricardo Valenzuela', fecha: '—', comentario: '—', estado: 'pending', estadoText: 'Pendiente' }
                ];
                aprobadores.forEach(function(a, i) {
                    var tr = document.createElement('tr');
                    tr.innerHTML = '<td style="text-align:center;color:#a9a39d;">' + (i + 1) + '</td>' +
                        '<td>' + a.rol + '</td>' +
                        '<td style="font-weight:500;">' + a.nombre + '</td>' +
                        '<td>' + a.fecha + '</td>' +
                        '<td>' + a.comentario + '</td>' +
                        '<td><span class="approval-badge ' + a.estado + '"><i class="fas fa-' + (a.estado === 'approved' ? 'check-circle' : 'clock') + '"></i> ' + a.estadoText + '</span></td>';
                    tbodyAprob.appendChild(tr);
                });
            }
        }


        /* ========= Propuesta Técnica - Paso 4 ========= */

        var techSections = [
            { id: 'objetivos', title: 'Objetivos y alcance', group: 'Definición', icon: 'bullseye', enabled: true },
            { id: 'normas', title: 'Normas aplicables a los servicios', group: 'Definición', icon: 'book', enabled: true },
            { id: 'ubicacion', title: 'Ubicación del servicio', group: 'Definición', icon: 'map-marked-alt', enabled: true },
            { id: 'metodologias_fq', title: 'Componentes físico-químicos', group: 'Metodologías', icon: 'flask', enabled: true },
            { id: 'metodologias_bio', title: 'Componentes biológicos', group: 'Metodologías', icon: 'leaf', enabled: true },
            { id: 'metodologias_fis', title: 'Componentes físicos', group: 'Metodologías', icon: 'wind', enabled: true },
            { id: 'profesionales', title: 'Profesionales a cargo del servicio', group: 'Equipo', icon: 'users', enabled: true },
            { id: 'coordinaciones', title: 'Coordinaciones', group: 'Equipo', icon: 'project-diagram', enabled: true },
            { id: 'autorizaciones', title: 'Autorizaciones a solicitar', group: 'Gestión', icon: 'file-signature', enabled: true }
        ];

        var techCustomSections = [];
        var techTreeState = { expanded: {} };
        var techSectionOrder = techSections.map(function(s) { return s.id; });

        var techSectionFields = {
            objetivos: ['Objetivo del servicio', 'Alcance del servicio'],
            normas: ['Introducción', 'Normas aplicables'],
            ubicacion: ['Introducción', 'Mapa de ubicación'],
            profesionales: ['Introducción', 'Listado de profesionales'],
            coordinaciones: ['Unidad coordinadora', 'Movilización en terreno', 'Ropa de trabajo'],
            autorizaciones: ['Introducción', 'Autorizaciones a solicitar'],
            metodologias_fq: ['Protocolo de muestreo / Estudio', 'Parámetros a Analizar y Laboratorios', 'Parámetros medidos in situ'],
            metodologias_bio: ['Resumen', 'Contenido'],
            metodologias_fis: ['Resumen', 'Contenido']
        };

        var techDrafts = {};
        var activeTechId = '';
        var activeMetFQSubsection = 'protocolo_estudio';
        var quillEditors = {};
        var suppressQuillSync = false;
        var techMetFQSubsections = [
            { id: 'protocolo_estudio', title: 'Protocolo de muestreo / Estudio', fields: ['Introducción', 'Puntos de muestreo', 'Imagen asociada', 'Descripción'] },
            { id: 'parametros_laboratorios', title: 'Parámetros a Analizar y Laboratorios', fields: ['Texto introductorio', 'Control de análisis', 'Texto final'] },
            { id: 'parametros_in_situ', title: 'Parámetros medidos in situ', fields: ['Texto introductorio', 'Parámetros de terreno', 'Texto final'] }
        ];

        function escapeHtml(text) {
            var div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Register quill-table-better module (safely)
        var hasTableBetter = false;
        try {
            if (typeof QuillTableBetter !== 'undefined') {
                Quill.register({ 'modules/table-better': QuillTableBetter }, true);
                hasTableBetter = true;
            }
        } catch (e) {
            console.warn('quill-table-better registration failed:', e);
            hasTableBetter = false;
        }

        function initQuillEditor(containerId, placeholder, minRows) {
            var container = document.getElementById(containerId);
            if (!container || quillEditors[containerId]) return quillEditors[containerId];

            // Build toolbar - include table button only if module loaded
            var toolbarOpts = [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }]
            ];
            if (hasTableBetter) {
                toolbarOpts.push(['table-better']);
            }
            toolbarOpts.push(['clean']);

            // Build modules config
            var modulesConfig = {
                toolbar: toolbarOpts
            };
            if (hasTableBetter) {
                modulesConfig.table = false;
                modulesConfig['table-better'] = {
                    language: 'es_ES',
                    menus: ['column', 'row', 'merge', 'table', 'cell', 'delete'],
                    toolbarTable: true
                };
                modulesConfig.keyboard = {
                    bindings: QuillTableBetter.keyboardBindings
                };
            }

            var quillOpts = {
                theme: 'snow',
                placeholder: placeholder || '',
                modules: modulesConfig
            };

            var quill;
            try {
                quill = new Quill('#' + containerId, quillOpts);
            } catch (e) {
                console.warn('Quill init failed with table-better, retrying without:', e);
                // Fallback: basic toolbar without table-better
                var fallbackOpts = {
                    theme: 'snow',
                    placeholder: placeholder || '',
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['clean']
                        ]
                    }
                };
                quill = new Quill('#' + containerId, fallbackOpts);
            }
            var minHeight = (minRows || 4) * 24;
            quill.root.style.minHeight = minHeight + 'px';

            // Toolbar show/hide on focus/blur
            var toolbar = quill.container.previousElementSibling;
            var hideTimeout = null;
            function showToolbar() {
                if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null; }
                if (toolbar) toolbar.classList.add('ql-toolbar-visible');
            }
            function scheduleHide() {
                hideTimeout = setTimeout(function() {
                    if (toolbar && !toolbar.matches(':hover') && !quill.hasFocus()) {
                        toolbar.classList.remove('ql-toolbar-visible');
                    }
                }, 250);
            }
            quill.root.addEventListener('focus', showToolbar);
            quill.root.addEventListener('blur', scheduleHide);
            if (toolbar) {
                toolbar.addEventListener('mousedown', function(e) {
                    e.preventDefault();
                    showToolbar();
                });
                toolbar.addEventListener('mouseleave', function() {
                    if (!quill.hasFocus()) scheduleHide();
                });
            }

            quillEditors[containerId] = quill;
            return quill;
        }

        function getQuillHTML(containerId) {
            var quill = quillEditors[containerId];
            if (!quill) return '';
            var html = quill.root.innerHTML;
            if (html === '<p><br></p>' || html === '<p><br/></p>') return '';
            return html;
        }

        function setQuillHTML(containerId, html) {
            var quill = quillEditors[containerId];
            if (!quill) return;
            if (!html) { quill.setText(''); return; }
            if (html.indexOf('<') === -1) {
                html = html.split('\n').filter(function(line) {
                    return line.trim() !== '';
                }).map(function(line) {
                    return '<p>' + escapeHtml(line) + '</p>';
                }).join('');
                if (!html) { quill.setText(''); return; }
            }
            quill.clipboard.dangerouslyPasteHTML(html);
        }

        function sanitizeTechHtml(html) {
            if (!html) return '';
            var temp = document.createElement('div');
            temp.innerHTML = html;
            temp.querySelectorAll('script, style, iframe, object, embed').forEach(function(el) { el.remove(); });
            temp.querySelectorAll('*').forEach(function(el) {
                Array.from(el.attributes).forEach(function(attr) {
                    if (attr.name.startsWith('on')) el.removeAttribute(attr.name);
                });
            });
            return temp.innerHTML;
        }

        techDrafts.objetivos = {
            objetivo: 'La presente propuesta de licitación tiene como objetivo cautelar los diferentes alcances y requerimientos asociados al servicio, de manera que se efectúen con los más altos estándares de calidad, seguridad, ambiente y el nivel de cumplimiento de sus compromisos.\n\nUna vez adjudicado el servicio, Ecotecnos deberá desarrollar, ejecutar y cumplir todos aquellos trabajos, tareas, obligaciones, estudios, informes y requerimientos que se definen en el “Alcance del Servicio”, del presente documento.\n\nObjetivos específicos del PVA:\n- Conocer el efecto de la descarga causado por el Proyecto, a través de mediciones de las componentes de calidad de agua y biota marina;\n- Verificar el cumplimiento de las normas ambientales aplicables; y\n- Detectar de manera temprana cualquier efecto no previsto o no deseado, de modo que sea posible controlarlo, aplicando oportunamente las medidas o acciones pertinentes.',
            alcance: 'El Servicio que se solicita se entenderá en su más amplia acepción, e incluirá entre otros, aspectos administrativos, técnicos y de control de calidad permanente de sus servicios, y aquellos relacionados con el cumplimiento de la normativa ambiental vigente. En consecuencia, deberán contemplar todos los recursos para la obtención de resultados óptimos en la gestión que se les encomienda, no pudiendo en ningún caso condicionar su trabajo a aspectos que, a su juicio, no están contemplados en los presentes Términos de Referencia, que merezcan interpretación, u otras causas de orden similar.\n\nEsta Propuesta Técnica incluye las metodologías a utilizar para desarrollar levantamientos relacionados a la descripción del medio marino, tanto del medio físico como de los componentes ambientales que son objeto de protección (agua, biota y fondo marino), en la zona de estudio, asociadas al Programa de Vigilancia Ambiental.',
            updatedAt: ''
        };

        techDrafts.normas = {
            intro: 'Las normas aplicables a los servicios serán consideradas como marco de referencia para la ejecución, control de calidad y cumplimiento regulatorio de esta propuesta.',
            selected: [],
            updatedAt: ''
        };

        techDrafts.ubicacion = {
            intro: 'Los servicios serán realizados en la ciudad de Iquique, en la Región de Tarapacá, en las inmediaciones de APORT.',
            mapImage: '',
            mapName: '',
            mapCaption: '',
            updatedAt: ''
        };

        techDrafts.profesionales = {
            intro: 'Ecotecnos pone a disposición su staff de profesionales, asegurando la calidad de los estudios que se compromete a llevar a cabo.',
            selected: [],
            updatedAt: ''
        };

        techDrafts.coordinaciones = {
            unidad_coordinadora: 'Para todos los efectos de este Servicio, Ecotecnos designará un profesional como Coordinador, para efectos de representación durante todo el desarrollo de los trabajos, y es con quien el mandante se relacionará directamente.',
            movilizacion: 'Para la realización del servicio se considerarán vehículos de terreno.\n\nLos vehículos cumplirán con todas las regulaciones exigidas en la Ley de Tránsito y contarán con los seguros correspondientes.\n\nEstos vehículos permitirán garantizar la operatividad del servicio en lo referente a la operatividad y logística.\n\nAdicionalmente los vehículos dispondrán de sistema GPS, que será utilizado para controlar el cumplimiento de velocidades, visitas efectivas, permanencia y realización de las actividades programadas por el Administrador de Contrato de Ecotecnos.',
            ropa_trabajo: 'Todos los Inspectores de Terreno de Ecotecnos utilizarán los implementos de seguridad correspondientes para este tipo de actividad.\n\nLos elementos de protección personal y de seguridad necesarios y requeridos para la prestación del servicio, son de acuerdo con las exigencias del Art. 53 del D.S. N° 594 "Reglamento sobre Condiciones Sanitarias y Ambientales Básicas en los Lugares de Trabajo", y del R.E.S.S.O. revisión 4 o la versión que lo reemplace. Asimismo, todos los elementos de protección personal deberán cumplir lo dispuesto en el Párrafo IV "De los Equipos de Protección Personal", Art. 54 del D.S. N° 594 y especificaciones técnicas del fabricante.\n\nLos elementos de protección personal y de ropa de trabajo básicos y específicos que utilizarán los trabajadores, están de acuerdo con los riesgos, los peligros y agentes presentes en el área o actividad que realizarán, en cantidad necesaria y certificados en su calidad.',
            updatedAt: ''
        };

        techDrafts.autorizaciones = {
            intro: 'Se requerirá de las siguientes autorizaciones para la ejecución del servicio.',
            selected: [],
            updatedAt: ''
        };

        techDrafts.metodologias_fq = { protocolo_intro: '', protocolo_puntos: [], protocolo_imagen: '', protocolo_imagen_name: '', protocolo_descripcion: '', selectedParams: [], params_intro: '', texto_final: '', in_situ_intro: '', in_situ_selected: [], in_situ_final: '', updatedAt: '' };
        techDrafts.metodologias_bio = { summary: '', content: '', notes: '', updatedAt: '' };
        techDrafts.metodologias_fis = { summary: '', content: '', notes: '', updatedAt: '' };

        var techFQParametroCatalog = [
            { parametro: 'Aceites y grasas', unidad: 'mg/L', limite: '0.8', metodologia: 'I-ENV-LAB-282 Ed00 Basado en Método 5520C, Standard Methods Ed23, 2017.', laboratorios: 'Lab. Santiago - ENV, Lab. Antofagasta - ENV' },
            { parametro: 'Amonio', unidad: 'mg/L', limite: '0.01', metodologia: 'I-ENV-LAB-249 Ed.00, Basado en SM 4500-NH3 BD Ed.23, 2017.', laboratorios: 'Lab. Santiago - ENV' },
            { parametro: 'Arsénico total', unidad: 'mg/L', limite: '0.0003', metodologia: 'I-ENV-LAB-511 Ed00 Basado en EPA 200.8:1994 Rev 5.4, EPA 6020 B, ISO 17294-2(2016), Standard Methods 3125 B ICPMS.', laboratorios: 'Lab. Santiago - ENV' },
            { parametro: 'Cadmio total', unidad: 'mg/L', limite: '0.0001', metodologia: 'I-ENV-LAB-511 Ed00 Basado en EPA 200.8:1994 Rev 5.4, EPA 6020 B, ISO 17294-2(2016), Standard Methods 3125 B ICPMS.', laboratorios: 'Lab. Santiago - ENV' },
            { parametro: 'Cinc total', unidad: 'mg/L', limite: '0.0005', metodologia: 'I-ENV-LAB-511 Ed00 Basado en EPA 200.8:1994 Rev 5.4, EPA 6020 B, ISO 17294-2(2016), Standard Methods 3125 B ICPMS.', laboratorios: 'Lab. Santiago - ENV' },
            { parametro: 'Cobre total', unidad: 'mg/L', limite: '0.0002', metodologia: 'I-ENV-LAB-511 Ed00 Basado en EPA 200.8:1994 Rev 5.4, EPA 6020 B, ISO 17294-2(2016), Standard Methods 3125 B ICPMS.', laboratorios: 'Lab. Santiago - ENV' },
            { parametro: 'Cromo total', unidad: 'mg/L', limite: '0.0005', metodologia: 'I-ENV-LAB-511 Ed00 Basado en EPA 200.8:1994 Rev 5.4, EPA 6020 B, ISO 17294-2(2016), Standard Methods 3125 B ICPMS.', laboratorios: 'Lab. Santiago - ENV' },
            { parametro: 'DBO5', unidad: 'mg/L', limite: '2', metodologia: 'I-ENV-LAB-285 Ed00 Basado en ISO 17289:2014, NCh 2313/5 Of.2005 Método Sensor Óptico.', laboratorios: 'Lab. Santiago - ENV, Lab. Antofagasta - ENV' },
            { parametro: 'Determinación de coliformes fecales', unidad: 'NMP/100mL', limite: '1.8', metodologia: 'Standard Methods 9221 E (E2), Ed 23 2017.', laboratorios: 'Lab. Santiago - ENV' },
            { parametro: 'Fósforo total', unidad: 'mg/L', limite: '0.01', metodologia: 'SM 4500-P C Ed.23, 2017.', laboratorios: 'Lab. Santiago - ENV' },
            { parametro: 'Hidrocarburos totales por cálculo', unidad: 'mg/L', limite: '2', metodologia: 'SM 5520 F Ed.23, 2017, I-ENV-LAB-304 Basado en NCh 2313-7 (Cálculo).', laboratorios: 'Lab. Santiago - ENV' },
            { parametro: 'Nitrato', unidad: 'mg/L', limite: '0.01', metodologia: 'Standard Methods 4110 B, Ed 23 2017.', laboratorios: 'Lab. Santiago - ENV' },
            { parametro: 'Nitrito', unidad: 'mg/L', limite: '0.01', metodologia: 'Standard Methods 4110 B, Ed 23 2017.', laboratorios: 'Lab. Santiago - ENV' },
            { parametro: 'Nitrógeno Kjeldahl', unidad: 'mg/L', limite: '0.2', metodologia: 'Standard Methods 4500-Norg B, Ed 23 2017.', laboratorios: 'Lab. Santiago - ENV' },
            { parametro: 'Nitrógeno Total', unidad: 'mg/L', limite: '0.2', metodologia: 'SM 4500 B,(N, org B-Nitrogeno Total Ed.23, 2017 (Cálculo).', laboratorios: 'Lab. Santiago - ENV' },
            { parametro: 'Sólidos suspendidos', unidad: 'mg/L', limite: '1', metodologia: 'Standard Methods 2540 D, Ed 23 2017.', laboratorios: 'Lab. Santiago - ENV, Lab. Antofagasta - ENV' },
            { parametro: 'Surfactantes aniónicos (SAAM)', unidad: 'mg/L', limite: '0.05', metodologia: 'Standard Methods 5540-BC, Ed 23 2017.', laboratorios: 'Lab. Santiago - ENV' },
            { parametro: 'Turbiedad', unidad: 'NTU', limite: '0.05', metodologia: 'Standard Methods 2130. B. Ed 23 2017.', laboratorios: 'Lab. Santiago - ENV' }
        ];

        var techInSituCatalog = [
            { parametro: 'Conductividad', metodo: 'PI A&S-2 (Versión 3) / IGEN-2.5 versión 0 medidor multiparámetro' },
            { parametro: 'Oxígeno disuelto', metodo: 'PI A&S-2 (Versión 3) / IGEN-2.5 versión 0 medidor multiparámetro' },
            { parametro: 'Temperatura', metodo: 'PI A&S-2 (Versión 3) / IGEN-2.5 versión 0 medidor multiparámetro' },
            { parametro: 'pH', metodo: 'PI A&S-1 (Versión 2) / IGEN-2.2 versión 0 uso pH-metro' },
            { parametro: 'Potencial redox', metodo: 'PI A&S-1 (Versión 2) / IGEN-2.2 versión 2 uso potenciómetros' },
            { parametro: 'Cloro libre', metodo: 'PI A&S-1 (Versión 2) / IGEN-2.3 versión 2 medidor de cloro libre y total' },
            { parametro: 'Saturación de oxígeno', metodo: 'PI A&S-2 Versión 3 / Uso CTDO' },
            { parametro: 'Densidad', metodo: 'PI A&S-2 Versión 3 / Uso CTDO' },
            { parametro: 'Salinidad', metodo: 'PI A&S-2 Versión 3 / Uso CTDO' },
            { parametro: 'Turbiedad', metodo: 'PI A&S-2 Versión 3 / IGEN-2.4 versión 0 medidor de turbidez' },
            { parametro: 'Cloro total', metodo: 'IGEN-2.3 Versión 2 medidor de cloro libre y total' },
            { parametro: 'Transparencia', metodo: 'I.AS-1.5 Versión 0 / Uso de disco Secchi' }
        ];

        var techProfesionalCatalog = [
            'Dr. Carlos Spano - Biólogo Marino. Dr. en Sistemática y Biodiversidad.',
            'Dr. Guillermo Feliú - Biólogo Marino. Dr. en Ciencias Ambientales.',
            'Alejandra Castro - Bióloga Marina. Especialista en comunidades bentónicas.',
            'Dra. Lissette Cárdenas - Bióloga Marina. Dra. en Biología y Ecología Aplicada.',
            'M. Sc. Daniela Contreras - Químico Industrial. M. Sc. en Oceanografía.',
            'Ricardo Castillo - Ingeniero Civil Oceánico.',
            'Dr. Ricardo Bravo - Dr. en Biología. Especialista en comunidades zooplanctónicas.',
            'Dr. Ítalo Masotti - Dr. en Biología. Especialista en comunidades fitoplanctónicas.'
        ];

        var techAutorizacionCatalog = [
            {
                name: 'Autorización SHOA',
                text: 'Se solicitará la autorización del Servicio Hidrográfico y Oceanográfico de la Armada de Chile (SHOA), de acuerdo con lo estipulado en el Decreto Supremo N° 711 de fecha 22 de agosto de 1975 “Reglamento de Control de las Investigaciones Científicas y Tecnológicas Marinas efectuadas en la Zona Marítima de Jurisdicción Nacional”.'
            },
            {
                name: 'Autorización SUBPESCA',
                text: 'En la actualidad la Subsecretaría de Pesca (SUBPESCA) se encuentra requiriendo la Solicitud de Pesca de Investigación, la cual será tramitada en este estudio. Para esto se utilizará el “Formulario para la Solicitud de Permisos de Pesca de Investigación correspondiente a Proyectos sometidos al Sistema de Evaluación de Impacto Ambiental”. Esto, en acuerdo al D.S. N° 430 de 1991 del Ministerio de Economía, Fomento y Reconstrucción, que establece los requisitos que deben cumplir las solicitudes de Pesca de Investigación.'
            }
        ];

        var techNormaCatalog = [
            'ISO 17025 - Requisitos generales para la competencia de los laboratorios de ensayo y calibración',
            'ISO 14001 - Sistemas de gestión ambiental',
            'ISO 9001 - Sistemas de gestión de la calidad',
            'NCh 1333 - Calidad del agua',
            'DS 90 - Norma de emisión para la regulación de contaminantes asociados a las descargas',
            'DS 46 - Norma de emisión para la regulación de contaminantes asociados a descargas al mar',
            'EPA 160.1 - Métodos de muestreo y preservación de agua',
            'EPA 200.7 - Determinación de metales por ICP'
        ];

        function getSectionById(id) {
            var all = techSections.concat(techCustomSections);
            return all.find(function(s) { return s.id === id; });
        }

        function getAllSections() {
            var all = techSections.concat(techCustomSections);
            if (!techSectionOrder || techSectionOrder.length === 0) return all;
            return techSectionOrder.map(function(id) {
                return all.find(function(s) { return s.id === id; });
            }).filter(Boolean);
        }

        function getSectionFields(section) {
            if (section.isCustom) return section.fields || [];
            return techSectionFields[section.id] || [];
        }

        function buildTechTree() {
            var tree = document.getElementById('techWikiTree');
            if (!tree) return;

            var html = '';
            getAllSections().forEach(function(section) {
                if (typeof techTreeState.expanded[section.id] === 'undefined') {
                    techTreeState.expanded[section.id] = section.id === activeTechId;
                }
                var active = section.id === activeTechId ? ' active' : '';
                var disabledClass = section.enabled === false ? ' disabled' : '';
                var expanded = techTreeState.expanded[section.id] ? ' open' : '';
                var fields = getSectionFields(section);
                var draggable = section.isCustom ? (section._editable ? 'false' : 'true') : 'true';
                html += '<div class="tech-tree-item' + active + disabledClass + '" data-tech-id="' + section.id + '" draggable="' + draggable + '">' +
                    '<button class="tech-tree-expand' + expanded + '" data-expand="' + section.id + '"><i class="fas fa-caret-right"></i></button>' +
                    '<i class="fas fa-folder"></i>' +
                    '<span class="tech-tree-name" data-tech-name="' + section.id + '">' + section.title + '</span>' +
                    (section.isCustom ? '<div class="tech-tree-menu" data-menu="' + section.id + '">' +
                        '<button class="tech-tree-menu-btn" data-menu-btn="' + section.id + '"><i class="fas fa-ellipsis-v"></i></button>' +
                        '<div class="tech-tree-menu-content">' +
                            '<button data-menu-edit="' + section.id + '"><i class="fas fa-pen"></i> Editar nombre</button>' +
                            '<button data-menu-add-field="' + section.id + '"><i class="fas fa-plus"></i> Agregar campo</button>' +
                            '<button data-menu-delete="' + section.id + '"><i class="fas fa-trash"></i> Eliminar sección</button>' +
                        '</div>' +
                    '</div>' : '') +
                    '<label class="tech-tree-toggle">' +
                        '<input type="checkbox" data-tech-toggle="' + section.id + '"' + (section.enabled === false ? '' : ' checked') + '>' +
                    '</label>' +
                '</div>';

                html += '<div class="tech-tree-fields" data-fields-for="' + section.id + '" style="display:' + (techTreeState.expanded[section.id] ? 'grid' : 'none') + ';">';
                if (fields.length === 0) {
                    html += '<div class="tech-editor-hint">Sin campos definidos.</div>';
                } else if (section.isCustom) {
                    fields.forEach(function(f) {
                        html += '<div class="tech-tree-field" draggable="true" data-field-parent="' + section.id + '" data-field-name="' + f + '">' +
                            '<i class="fas fa-file-alt" style="color:#b5b0a8;"></i>' +
                            '<span class="tech-tree-field-name" data-field-name-label="' + section.id + '">' + f + '</span>' +
                            '<div class="tech-tree-menu" data-menu-field="' + section.id + '" data-menu-field-name="' + f + '">' +
                                '<button class="tech-tree-menu-btn" data-menu-field-btn="' + section.id + '" data-menu-field-name="' + f + '"><i class="fas fa-ellipsis-v"></i></button>' +
                                '<div class="tech-tree-menu-content">' +
                                    '<button data-menu-field-edit="' + section.id + '" data-menu-field-name="' + f + '"><i class="fas fa-pen"></i> Editar</button>' +
                                    '<button data-menu-field-delete="' + section.id + '" data-menu-field-name="' + f + '"><i class="fas fa-trash"></i> Eliminar</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                    });
                } else {
                    if (section.id === 'metodologias_fq') {
                        techMetFQSubsections.forEach(function(sub) {
                            var activeSub = (activeTechId === 'metodologias_fq' && activeMetFQSubsection === sub.id) ? ' active' : '';
                            html += '<div class="tech-tree-item tech-tree-subsection' + activeSub + '" data-tech-id="metodologias_fq" data-metfq-subsection="' + sub.id + '">' +
                                '<i class="fas fa-folder"></i>' +
                                '<span class="tech-tree-name">' + sub.title + '</span>' +
                            '</div>';
                            html += '<div class="tech-tree-subfields">';
                            (sub.fields || []).forEach(function(f) {
                                html += '<div class="tech-tree-field">' +
                                    '<i class="fas fa-file-alt" style="color:#b5b0a8;"></i>' +
                                    '<span>' + f + '</span>' +
                                '</div>';
                            });
                            html += '</div>';
                        });
                    } else {
                        fields.forEach(function(f) {
                            html += '<div class="tech-tree-field">' +
                                '<i class="fas fa-file-alt" style="color:#b5b0a8;"></i>' +
                                '<span>' + f + '</span>' +
                            '</div>';
                        });
                    }
                }
                if (section.isCustom) {
                    // add-field moved to contextual menu
                }
                html += '</div>';
            });

            tree.innerHTML = html ? '<div class="tech-tree-list">' + html + '</div>' : '<div class="tech-editor-hint" style="padding:10px 12px;">Sin resultados</div>';
            tree.querySelectorAll('.tech-tree-item[data-tech-id]').forEach(function(row) {
                row.addEventListener('click', function(e) {
                    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL' || e.target.tagName === 'BUTTON' || e.target.tagName === 'I')) return;
                    var id = this.getAttribute('data-tech-id');
                    var subId = this.getAttribute('data-metfq-subsection');
                    var section = getAllSections().find(function(s) { return s.id === id; });
                    if (section && section.enabled === false) return;
                    if (id === 'metodologias_fq' && subId) activeMetFQSubsection = subId;
                    selectTechItem(this.getAttribute('data-tech-id'));
                });
            });

            tree.querySelectorAll('input[data-tech-toggle]').forEach(function(toggle) {
                toggle.addEventListener('change', function() {
                    var id = this.getAttribute('data-tech-toggle');
                    var section = getAllSections().find(function(s) { return s.id === id; });
                    if (!section) return;
                    section.enabled = this.checked;
                    if (!section.enabled && activeTechId === id) {
                        var next = getAllSections().find(function(s) { return s.enabled !== false; });
                        if (next) selectTechItem(next.id);
                    }
                    buildTechTree();
                    renderTechDocFull();
                });
            });

            tree.querySelectorAll('button[data-expand]').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var id = this.getAttribute('data-expand');
                    techTreeState.expanded[id] = !techTreeState.expanded[id];
                    buildTechTree();
                });
            });

            tree.querySelectorAll('button[data-menu-btn]').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var id = this.getAttribute('data-menu-btn');
                    tree.querySelectorAll('.tech-tree-menu.open').forEach(function(m) {
                        if (m.getAttribute('data-menu') !== id) m.classList.remove('open');
                    });
                    var menu = tree.querySelector('.tech-tree-menu[data-menu="' + id + '"]');
                    if (menu) menu.classList.toggle('open');
                });
            });

            tree.querySelectorAll('button[data-menu-edit]').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var id = this.getAttribute('data-menu-edit');
                    var section = getAllSections().find(function(s) { return s.id === id; });
                    if (!section) return;
                    var nameEl = tree.querySelector('[data-tech-name="' + id + '"]');
                    if (!nameEl) return;
                    var input = document.createElement('input');
                    input.type = 'text';
                    input.value = section.title;
                    input.className = 'tech-map-caption-input';
                    nameEl.replaceWith(input);
                    input.focus();
                    function save() {
                        section.title = input.value.trim() || section.title;
                        if (section.isCustom) {
                            // enable dragging after edit
                            section._editable = false;
                        }
                        buildTechTree();
                        if (activeTechId === id) selectTechItem(id);
                    }
                    input.addEventListener('blur', save);
                    input.addEventListener('keydown', function(ev) {
                        if (ev.key === 'Enter') {
                            ev.preventDefault();
                            input.blur();
                        }
                    });
                });
            });

            tree.querySelectorAll('button[data-menu-add-field]').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var id = this.getAttribute('data-menu-add-field');
                    var section = getAllSections().find(function(s) { return s.id === id; });
                    if (!section) return;
                    section.fields = section.fields || [];
                    section.fields.push('Nuevo campo');
                    techTreeState.expanded[id] = true;
                    buildTechTree();
                    if (activeTechId === id) selectTechItem(id);
                });
            });

            tree.querySelectorAll('button[data-menu-delete]').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var id = this.getAttribute('data-menu-delete');
                    if (!confirm('Eliminar sección?')) return;
                    techCustomSections = techCustomSections.filter(function(s) { return s.id !== id; });
                    if (techSectionOrder) {
                        techSectionOrder = techSectionOrder.filter(function(sectionId) { return sectionId !== id; });
                    }
                    delete techDrafts[id];
                    if (activeTechId === id) activeTechId = '';
                    buildTechTree();
                    renderTechDocFull();
                });
            });

            tree.querySelectorAll('button[data-menu-field-btn]').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var id = this.getAttribute('data-menu-field-btn');
                    var name = this.getAttribute('data-menu-field-name');
                    tree.querySelectorAll('.tech-tree-menu.open').forEach(function(m) {
                        if (m.getAttribute('data-menu-field') !== id || m.getAttribute('data-menu-field-name') !== name) {
                            m.classList.remove('open');
                        }
                    });
                    var menu = tree.querySelector('.tech-tree-menu[data-menu-field="' + id + '"][data-menu-field-name="' + name + '"]');
                    if (menu) menu.classList.toggle('open');
                });
            });

            tree.querySelectorAll('button[data-menu-field-edit]').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var id = this.getAttribute('data-menu-field-edit');
                    var name = this.getAttribute('data-menu-field-name');
                    var section = getAllSections().find(function(s) { return s.id === id; });
                    if (!section) return;
                    var nameEl = tree.querySelector('.tech-tree-field[data-field-parent="' + id + '"][data-field-name="' + name + '"] .tech-tree-field-name');
                    if (!nameEl) return;
                    var input = document.createElement('input');
                    input.type = 'text';
                    input.value = name;
                    input.className = 'tech-map-caption-input';
                    nameEl.replaceWith(input);
                    input.focus();
                    function save() {
                        var fields = section.fields || [];
                        var index = fields.indexOf(name);
                        var newVal = input.value.trim() || name;
                        if (index >= 0) fields[index] = newVal;
                        if (techDrafts[id] && techDrafts[id].fields && name !== newVal) {
                            if (Object.prototype.hasOwnProperty.call(techDrafts[id].fields, name)) {
                                techDrafts[id].fields[newVal] = techDrafts[id].fields[name];
                                delete techDrafts[id].fields[name];
                            }
                        }
                        buildTechTree();
                        if (activeTechId === id) selectTechItem(id);
                    }
                    input.addEventListener('blur', save);
                    input.addEventListener('keydown', function(ev) {
                        if (ev.key === 'Enter') {
                            ev.preventDefault();
                            input.blur();
                        }
                    });
                });
            });

            tree.querySelectorAll('button[data-menu-field-delete]').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var id = this.getAttribute('data-menu-field-delete');
                    var name = this.getAttribute('data-menu-field-name');
                    var section = getAllSections().find(function(s) { return s.id === id; });
                    if (!section) return;
                    section.fields = (section.fields || []).filter(function(f) { return f !== name; });
                    buildTechTree();
                    if (activeTechId === id) selectTechItem(id);
                });
            });

            // field delete handled by contextual menu

            document.addEventListener('click', function(e) {
                if (!e.target.closest('.tech-tree-menu')) {
                    document.querySelectorAll('.tech-tree-menu.open').forEach(function(m) {
                        m.classList.remove('open');
                    });
                }
            });

            tree.querySelectorAll('.tech-tree-item[draggable="true"]').forEach(function(row) {
                row.addEventListener('dragstart', function(e) {
                    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'section', id: this.getAttribute('data-tech-id') }));
                });
                row.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    this.classList.add('tech-drag-over');
                });
                row.addEventListener('dragleave', function() {
                    this.classList.remove('tech-drag-over');
                });
                row.addEventListener('drop', function(e) {
                    e.preventDefault();
                    this.classList.remove('tech-drag-over');
                    var data = e.dataTransfer.getData('text/plain');
                    if (!data) return;
                    var payload = JSON.parse(data);
                    if (payload.type !== 'section') return;
                    var fromId = payload.id;
                    var toId = this.getAttribute('data-tech-id');
                    if (fromId === toId) return;
                    var order = techSectionOrder.slice();
                    var fromIndex = order.indexOf(fromId);
                    var toIndex = order.indexOf(toId);
                    if (fromIndex < 0 || toIndex < 0) return;
                    var moving = order[fromIndex];
                    order.splice(fromIndex, 1);
                    order.splice(toIndex, 0, moving);
                    techSectionOrder = order;
                    buildTechTree();
                    renderTechDocFull();
                });
            });

            tree.querySelectorAll('.tech-tree-item[draggable="false"]').forEach(function(row) {
                row.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    this.classList.add('tech-drag-over');
                });
                row.addEventListener('dragleave', function() {
                    this.classList.remove('tech-drag-over');
                });
                row.addEventListener('drop', function(e) {
                    e.preventDefault();
                    this.classList.remove('tech-drag-over');
                    var data = e.dataTransfer.getData('text/plain');
                    if (!data) return;
                    var payload = JSON.parse(data);
                    if (payload.type !== 'section') return;
                    var fromId = payload.id;
                    var toId = this.getAttribute('data-tech-id');
                    if (fromId === toId) return;
                    var order = techSectionOrder.slice();
                    var fromIndex = order.indexOf(fromId);
                    var toIndex = order.indexOf(toId);
                    if (fromIndex < 0 || toIndex < 0) return;
                    var moving = order[fromIndex];
                    order.splice(fromIndex, 1);
                    order.splice(toIndex, 0, moving);
                    techSectionOrder = order;
                    buildTechTree();
                    renderTechDocFull();
                });
                row.addEventListener('dragstart', function(e) {
                    e.preventDefault();
                });
            });


            tree.querySelectorAll('.tech-tree-field[draggable="true"]').forEach(function(row) {
                row.addEventListener('dragstart', function(e) {
                    e.dataTransfer.setData('text/plain', JSON.stringify({
                        type: 'field',
                        parent: this.getAttribute('data-field-parent'),
                        name: this.getAttribute('data-field-name')
                    }));
                });
                row.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    this.classList.add('tech-drag-over');
                });
                row.addEventListener('dragleave', function() {
                    this.classList.remove('tech-drag-over');
                });
                row.addEventListener('drop', function(e) {
                    e.preventDefault();
                    this.classList.remove('tech-drag-over');
                    var data = e.dataTransfer.getData('text/plain');
                    if (!data) return;
                    var payload = JSON.parse(data);
                    if (payload.type !== 'field') return;
                    var parentId = this.getAttribute('data-field-parent');
                    if (payload.parent !== parentId) return;
                    var section = getAllSections().find(function(s) { return s.id === parentId; });
                    if (!section || !section.fields) return;
                    var fromIndex = section.fields.indexOf(payload.name);
                    var toName = this.getAttribute('data-field-name');
                    var toIndex = section.fields.indexOf(toName);
                    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;
                    var moving = section.fields[fromIndex];
                    section.fields.splice(fromIndex, 1);
                    section.fields.splice(toIndex, 0, moving);
                    buildTechTree();
                    if (activeTechId === parentId) selectTechItem(parentId);
                });
            });
        }

        function updateTechStatus(text) {
            var statusEl = document.getElementById('techEditorStatus');
            if (statusEl) statusEl.textContent = text;
        }

        function renderTechDocView() {
            var container = document.getElementById('techDocView');
            if (!container || !activeTechId) return;

            var section = getAllSections().find(function(s) { return s.id === activeTechId; });
            var title = section ? section.title : 'Sección';
            var draft = techDrafts[activeTechId] || {};

            if (activeTechId === 'objetivos') {
                container.innerHTML =
                    '<div class="tech-doc-title">Objetivo del servicio</div>' +
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.objetivo) || '—') + '</div>' +
                    '<div class="tech-doc-title">Alcance del servicio</div>' +
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.alcance) || '—') + '</div>';
                return;
            }

            if (activeTechId === 'normas') {
                var normas = (draft.selected || []);
                var normasHtml = normas.length
                    ? '<div class="tech-doc-list">' + normas.map(function(n) { return '<div>• ' + n + '</div>'; }).join('') + '</div>'
                    : '<div class="tech-doc-text">—</div>';
                container.innerHTML =
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.intro) || '—') + '</div>' +
                    '<div class="tech-doc-title">Normas aplicables</div>' +
                    normasHtml;
                return;
            }

            if (activeTechId === 'ubicacion') {
                var imgHtml = draft.mapImage
                    ? '<div class="tech-map-preview" style="margin-top:0;"><img src="' + draft.mapImage + '" alt="Mapa de ubicación"><div class="tech-map-meta">' + (draft.mapCaption || draft.mapName || '') + '</div></div>'
                    : '<div class="tech-doc-text">—</div>';
                container.innerHTML =
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.intro) || '—') + '</div>' +
                    '<div class="tech-doc-title">Mapa de ubicación</div>' +
                    imgHtml;
                return;
            }

            if (activeTechId === 'profesionales') {
                var items = draft.selected || [];
                var listHtml = items.length
                    ? '<div class="tech-doc-list">' + items.map(function(n, idx) { return '<div>' + (idx + 1) + '. ' + n + '</div>'; }).join('') + '</div>'
                    : '<div class="tech-doc-text">—</div>';
                container.innerHTML =
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.intro) || '—') + '</div>' +
                    '<div class="tech-doc-title">Profesionales</div>' +
                    listHtml;
                return;
            }

            if (activeTechId === 'coordinaciones') {
                container.innerHTML =
                    '<div class="tech-doc-title">Unidad coordinadora</div>' +
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.unidad_coordinadora) || '—') + '</div>' +
                    '<div class="tech-doc-title">Movilización en terreno</div>' +
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.movilizacion) || '—') + '</div>' +
                    '<div class="tech-doc-title">Ropa de trabajo</div>' +
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.ropa_trabajo) || '—') + '</div>';
                return;
            }

            if (activeTechId === 'autorizaciones') {
                var auths = draft.selected || [];
                var authHtml = auths.length
                    ? '<div class="tech-doc-list">' + auths.map(function(a, i) { return '<div>' + (i + 1) + '. <strong>' + a.name + '</strong>: ' + a.text + '</div>'; }).join('') + '</div>'
                    : '<div class="tech-doc-text">—</div>';
                container.innerHTML =
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.intro) || '—') + '</div>' +
                    '<div class="tech-doc-title">Autorizaciones</div>' +
                    authHtml;
                return;
            }


            if (activeTechId === 'metodologias_fq') {
                var puntosProtocolo = draft.protocolo_puntos || [];
                var protocolHtml = '<table class="tech-fq-protocol-table"><thead><tr><th>#</th><th>Nombre Estación</th><th>Lugar de Muestreo</th><th>Coordenadas Geográficas</th><th>Matriz</th></tr></thead><tbody>';
                if (puntosProtocolo.length) {
                    puntosProtocolo.forEach(function(p, idx) {
                        protocolHtml += '<tr><td>' + (idx + 1) + '</td><td>' + (p.estacion || '—') + '</td><td>' + (p.lugar || '—') + '</td><td>' + (p.coordenadas || '—') + '</td><td>' + (p.matriz || '—') + '</td></tr>';
                    });
                } else {
                    protocolHtml += '<tr><td colspan="5" style="text-align:center;color:#aaa;">Sin puntos de muestreo</td></tr>';
                }
                protocolHtml += '</tbody></table>';
                var parametros = draft.selectedParams || [];
                var tableHtml = '<table class="tech-fq-param-table"><thead><tr><th>Parámetro</th><th>Unidad</th><th>Límite de detección</th><th>Metodología</th><th>Laboratorios</th></tr></thead><tbody>';
                if (parametros.length) {
                    parametros.forEach(function(item) {
                        tableHtml += '<tr><td>' + (item.parametro || '—') + '</td><td>' + (item.unidad || '—') + '</td><td>' + (item.limite || '—') + '</td><td>' + (item.metodologia || '—') + '</td><td>' + (item.laboratorios || '—') + '</td></tr>';
                    });
                } else {
                    tableHtml += '<tr><td colspan="5" style="text-align:center;color:#aaa;">Sin parámetros seleccionados</td></tr>';
                }
                tableHtml += '</tbody></table>';
                var inSitu = draft.in_situ_selected || [];
                var inSituHtml = '<table class="tech-fq-insitu-table"><thead><tr><th>Parámetro</th><th>Método / Equipo</th></tr></thead><tbody>';
                if (inSitu.length) {
                    inSitu.forEach(function(item) {
                        inSituHtml += '<tr><td>' + (item.parametro || '—') + '</td><td>' + (item.metodo || '—') + '</td></tr>';
                    });
                } else {
                    inSituHtml += '<tr><td colspan="2" style="text-align:center;color:#aaa;">Sin parámetros de terreno seleccionados</td></tr>';
                }
                inSituHtml += '</tbody></table>';
                container.innerHTML =
                    '<div class="tech-doc-title">Protocolo de muestreo / Estudio</div>' +
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.protocolo_intro) || '—') + '</div>' +
                    protocolHtml +
                    '<div class="tech-doc-title">Imagen asociada</div>' +
                    (draft.protocolo_imagen
                        ? '<div class="tech-map-preview" style="margin-top:0;"><img src="' + draft.protocolo_imagen + '" alt="Imagen protocolo de muestreo"></div>'
                        : '<div class="tech-doc-text">—</div>') +
                    '<div class="tech-doc-title">Descripción</div>' +
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.protocolo_descripcion) || '—') + '</div>' +
                    '<div class="tech-doc-title">Texto introductorio</div>' +
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.params_intro) || '—') + '</div>' +
                    '<div class="tech-doc-title">Parámetros a analizar</div>' +
                    tableHtml +
                    '<div class="tech-doc-title">Texto final</div>' +
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.texto_final) || '—') + '</div>' +
                    '<div class="tech-doc-title">Parámetros medidos in situ</div>' +
                    '<div class="tech-doc-title">Texto introductorio</div>' +
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.in_situ_intro) || '—') + '</div>' +
                    inSituHtml +
                    '<div class="tech-doc-title">Texto final</div>' +
                    '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.in_situ_final) || '—') + '</div>';
                return;
            }

            if (section && section.isCustom) {
                var fields = section.fields || [];
                var fieldHtml = fields.map(function(f) {
                    var value = (draft.fields && draft.fields[f]) ? sanitizeTechHtml(draft.fields[f]) : '—';
                    return '<div class="tech-doc-title">' + f + '</div>' +
                        '<div class="tech-doc-text">' + value + '</div>';
                }).join('');
                container.innerHTML = fieldHtml || '<div class="tech-doc-text">—</div>';
                return;
            }

            container.innerHTML =
                '<div class="tech-doc-title">' + title + '</div>' +
                '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.summary) || '—') + '</div>' +
                '<div class="tech-doc-title">Contenido</div>' +
                '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.content) || '—') + '</div>';
        }

        function renderTechDocFull() {
            var container = document.getElementById('techDocFullContent');
            if (!container) return;
            var pagesHtml = '';

            getAllSections().filter(function(s) { return s.enabled !== false; }).forEach(function(section) {
                var draft = techDrafts[section.id] || {};
                var body = '';

                if (section.id === 'objetivos') {
                    body =
                        '<div class="tech-doc-title">Objetivo del servicio</div>' +
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.objetivo) || '—') + '</div>' +
                        '<div class="tech-doc-title">Alcance del servicio</div>' +
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.alcance) || '—') + '</div>';
                } else if (section.id === 'normas') {
                    var normas = (draft.selected || []);
                    var normasHtml = normas.length
                        ? '<div class="tech-doc-list">' + normas.map(function(n) { return '<div>• ' + n + '</div>'; }).join('') + '</div>'
                        : '<div class="tech-doc-text">—</div>';
                    body =
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.intro) || '—') + '</div>' +
                        '<div class="tech-doc-title">Normas aplicables</div>' +
                        normasHtml;
                } else if (section.id === 'ubicacion') {
                    var imgHtml = draft.mapImage
                        ? '<div class="tech-map-preview" style="margin-top:0;"><img src="' + draft.mapImage + '" alt="Mapa de ubicación"><div class="tech-map-meta">' + (draft.mapCaption || draft.mapName || '') + '</div></div>'
                        : '<div class="tech-doc-text">—</div>';
                    body =
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.intro) || '—') + '</div>' +
                        '<div class="tech-doc-title">Mapa de ubicación</div>' +
                        imgHtml;
                } else if (section.id === 'profesionales') {
                    var items = draft.selected || [];
                    var listHtml = items.length
                        ? '<div class="tech-doc-list">' + items.map(function(n, i) { return '<div>' + (i + 1) + '. ' + n + '</div>'; }).join('') + '</div>'
                        : '<div class="tech-doc-text">—</div>';
                    body =
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.intro) || '—') + '</div>' +
                        '<div class="tech-doc-title">Profesionales</div>' +
                        listHtml;
                } else if (section.id === 'coordinaciones') {
                    body =
                        '<div class="tech-doc-title">Unidad coordinadora</div>' +
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.unidad_coordinadora) || '—') + '</div>' +
                        '<div class="tech-doc-title">Movilización en terreno</div>' +
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.movilizacion) || '—') + '</div>' +
                        '<div class="tech-doc-title">Ropa de trabajo</div>' +
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.ropa_trabajo) || '—') + '</div>';
                } else if (section.id === 'autorizaciones') {
                    var auths = draft.selected || [];
                    var authHtml = auths.length
                        ? '<div class="tech-doc-list">' + auths.map(function(a, i) { return '<div>' + (i + 1) + '. <strong>' + a.name + '</strong>: ' + a.text + '</div>'; }).join('') + '</div>'
                        : '<div class="tech-doc-text">—</div>';
                    body =
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.intro) || '—') + '</div>' +
                        '<div class="tech-doc-title">Autorizaciones</div>' +
                        authHtml;
                } else if (section.id === 'metodologias_fq') {
                    var puntosProtocolo = draft.protocolo_puntos || [];
                    var tblProtocolHtml = '<table class="tech-fq-protocol-table"><thead><tr><th>#</th><th>Nombre Estación</th><th>Lugar de Muestreo</th><th>Coordenadas Geográficas</th><th>Matriz</th></tr></thead><tbody>';
                    if (puntosProtocolo.length) {
                        puntosProtocolo.forEach(function(p, idx) {
                            tblProtocolHtml += '<tr><td>' + (idx + 1) + '</td><td>' + (p.estacion || '—') + '</td><td>' + (p.lugar || '—') + '</td><td>' + (p.coordenadas || '—') + '</td><td>' + (p.matriz || '—') + '</td></tr>';
                        });
                    } else {
                        tblProtocolHtml += '<tr><td colspan="5" style="text-align:center;color:#aaa;">Sin puntos de muestreo</td></tr>';
                    }
                    tblProtocolHtml += '</tbody></table>';
                    var parametros = draft.selectedParams || [];
                    var tblHtml = '<table class="tech-fq-param-table"><thead><tr><th>Parámetro</th><th>Unidad</th><th>Límite de detección</th><th>Metodología</th><th>Laboratorios</th></tr></thead><tbody>';
                    if (parametros.length) {
                        parametros.forEach(function(item) {
                            tblHtml += '<tr><td>' + (item.parametro || '—') + '</td><td>' + (item.unidad || '—') + '</td><td>' + (item.limite || '—') + '</td><td>' + (item.metodologia || '—') + '</td><td>' + (item.laboratorios || '—') + '</td></tr>';
                        });
                    } else {
                        tblHtml += '<tr><td colspan="5" style="text-align:center;color:#aaa;">Sin parámetros seleccionados</td></tr>';
                    }
                    tblHtml += '</tbody></table>';
                    var inSitu = draft.in_situ_selected || [];
                    var tblInSituHtml = '<table class="tech-fq-insitu-table"><thead><tr><th>Parámetro</th><th>Método / Equipo</th></tr></thead><tbody>';
                    if (inSitu.length) {
                        inSitu.forEach(function(item) {
                            tblInSituHtml += '<tr><td>' + (item.parametro || '—') + '</td><td>' + (item.metodo || '—') + '</td></tr>';
                        });
                    } else {
                        tblInSituHtml += '<tr><td colspan="2" style="text-align:center;color:#aaa;">Sin parámetros de terreno seleccionados</td></tr>';
                    }
                    tblInSituHtml += '</tbody></table>';
                    body =
                        '<div class="tech-doc-title">Protocolo de muestreo / Estudio</div>' +
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.protocolo_intro) || '—') + '</div>' +
                        tblProtocolHtml +
                        '<div class="tech-doc-title">Imagen asociada</div>' +
                        (draft.protocolo_imagen
                            ? '<div class="tech-map-preview" style="margin-top:0;"><img src="' + draft.protocolo_imagen + '" alt="Imagen protocolo de muestreo"></div>'
                            : '<div class="tech-doc-text">—</div>') +
                        '<div class="tech-doc-title">Descripción</div>' +
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.protocolo_descripcion) || '—') + '</div>' +
                        '<div class="tech-doc-title">Texto introductorio</div>' +
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.params_intro) || '—') + '</div>' +
                        '<div class="tech-doc-title">Parámetros a analizar</div>' +
                        tblHtml +
                        '<div class="tech-doc-title">Texto final</div>' +
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.texto_final) || '—') + '</div>' +
                        '<div class="tech-doc-title">Parámetros medidos in situ</div>' +
                        '<div class="tech-doc-title">Texto introductorio</div>' +
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.in_situ_intro) || '—') + '</div>' +
                        tblInSituHtml +
                        '<div class="tech-doc-title">Texto final</div>' +
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.in_situ_final) || '—') + '</div>';
                } else if (section.isCustom) {
                    var fields = section.fields || [];
                    var fieldHtml = fields.map(function(f) {
                        var value = (draft.fields && draft.fields[f]) ? sanitizeTechHtml(draft.fields[f]) : '—';
                        return '<div class="tech-doc-title">' + f + '</div>' +
                            '<div class="tech-doc-text">' + value + '</div>';
                    }).join('');
                    body = fieldHtml || '<div class="tech-doc-text">—</div>';
                } else {
                    body =
                        '<div class="tech-doc-title">Resumen</div>' +
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.summary) || '—') + '</div>' +
                        '<div class="tech-doc-title">Contenido</div>' +
                        '<div class="tech-doc-text">' + (sanitizeTechHtml(draft.content) || '—') + '</div>';
                }

                pagesHtml +=
                    '<div class="tech-doc-section">' +
                        '<div class="tech-doc-section-title">' + section.title + '</div>' +
                        body +
                    '</div>';
            });

            container.innerHTML = '<div class="tech-pdf">' + pagesHtml + '</div>';
        }

        function renderNormasList() {
            if (!techDrafts.normas) return;
            var selected = techDrafts.normas.selected || [];
            var normas = techNormaCatalog.slice();
            selected.forEach(function(norma) {
                if (normas.indexOf(norma) === -1) normas.push(norma);
            });
            updateNormasSelected();
        }

        function updateNormasSelected() {
            var label = document.getElementById('techNormasSelected');
            if (!label || !techDrafts.normas) return;
            var count = (techDrafts.normas.selected || []).length;
            label.textContent = 'Seleccionadas: ' + count;
            renderNormasSelectedList();
        }

        function renderNormasSelectedList() {
            if (!techDrafts.normas) return;
            var listEl = document.getElementById('techNormasSelectedList');
            if (!listEl) return;
            var selected = techDrafts.normas.selected || [];
            if (selected.length === 0) {
                listEl.innerHTML = '<div class="tech-editor-hint">No hay normas seleccionadas.</div>';
                return;
            }
            listEl.innerHTML = selected.map(function(norma, idx) {
                return '<div class="tech-norma-row">' +
                    '<span>' + norma + '</span>' +
                    '<button type="button" data-remove-norma="' + idx + '"><i class="fas fa-times"></i></button>' +
                '</div>';
            }).join('');

            listEl.querySelectorAll('button[data-remove-norma]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var index = parseInt(this.getAttribute('data-remove-norma'), 10);
                    if (isNaN(index)) return;
                    selected.splice(index, 1);
                    techDrafts.normas.selected = selected;
                    updateNormasSelected();
                    updateTechStatus('Cambios sin guardar');
                });
            });
        }

        function renderProfesionalesList() {
            if (!techDrafts.profesionales) return;
            var listEl = document.getElementById('techProList');
            if (!listEl) return;
            var selected = techDrafts.profesionales.selected || [];
            if (selected.length === 0) {
                listEl.innerHTML = '<div class="tech-editor-hint">No hay profesionales seleccionados.</div>';
                return;
            }
            listEl.innerHTML = selected.map(function(item, idx) {
                return '<div class="tech-pro-item">' +
                    '<span>' + item + '</span>' +
                    '<button type="button" data-pro-index="' + idx + '"><i class="fas fa-times"></i></button>' +
                '</div>';
            }).join('');

            listEl.querySelectorAll('button[data-pro-index]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var index = parseInt(this.getAttribute('data-pro-index'), 10);
                    if (isNaN(index)) return;
                    techDrafts.profesionales.selected.splice(index, 1);
                    renderProfesionalesList();
                    updateTechStatus('Cambios sin guardar');
                });
            });
        }

        function renderAutorizacionesList() {
            if (!techDrafts.autorizaciones) return;
            var listEl = document.getElementById('techAuthList');
            if (!listEl) return;
            var selected = techDrafts.autorizaciones.selected || [];
            if (selected.length === 0) {
                listEl.innerHTML = '<div class="tech-editor-hint">No hay autorizaciones seleccionadas.</div>';
                return;
            }
            listEl.innerHTML = selected.map(function(item, idx) {
                return '<div class="tech-auth-item">' +
                    '<div class="tech-auth-title">' + (idx + 1) + '. ' + item.name + '</div>' +
                    '<div class="tech-auth-text">' + item.text + '</div>' +
                    '<div class="tech-auth-actions">' +
                        '<button type="button" class="btn btn-default btn-sm" data-auth-index="' + idx + '"><i class="fas fa-trash"></i> Quitar</button>' +
                    '</div>' +
                '</div>';
            }).join('');

            listEl.querySelectorAll('button[data-auth-index]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var index = parseInt(this.getAttribute('data-auth-index'), 10);
                    if (isNaN(index)) return;
                    techDrafts.autorizaciones.selected.splice(index, 1);
                    renderAutorizacionesList();
                    updateTechStatus('Cambios sin guardar');
                });
            });
        }

        function renderMetFQTable() {
            var tbody = document.getElementById('techMetFQParamTableBody');
            if (!tbody) return;
            var draft = techDrafts.metodologias_fq || {};
            var selected = draft.selectedParams || [];
            tbody.innerHTML = '';
            if (selected.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#aaa;">No hay parámetros seleccionados.</td></tr>';
                return;
            }
            selected.forEach(function(item, idx) {
                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td>' + (item.parametro || '—') + '</td>' +
                    '<td>' + (item.unidad || '—') + '</td>' +
                    '<td>' + (item.limite || '—') + '</td>' +
                    '<td>' + (item.metodologia || '—') + '</td>' +
                    '<td>' + (item.laboratorios || '—') + '</td>' +
                    '<td><button class="btn btn-link btn-sm text-danger" data-fq-remove="' + idx + '" title="Quitar"><i class="fas fa-times"></i></button></td>';
                tbody.appendChild(tr);
            });
            tbody.querySelectorAll('button[data-fq-remove]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var i = parseInt(this.getAttribute('data-fq-remove'), 10);
                    if (isNaN(i)) return;
                    techDrafts.metodologias_fq.selectedParams.splice(i, 1);
                    techDrafts.metodologias_fq.dirty = true;
                    updateTechStatus('Cambios sin guardar');
                    renderMetFQTable();
                    renderTechDocView();
                    renderTechDocFull();
                });
            });
        }

        function renderMetFQProtocolTable() {
            var tbody = document.getElementById('techMetFQProtocolTableBody');
            if (!tbody) return;
            var draft = techDrafts.metodologias_fq || {};
            if (!Array.isArray(draft.protocolo_puntos)) draft.protocolo_puntos = [];
            if (draft.protocolo_puntos.length === 0) {
                for (var i = 0; i < 5; i++) {
                    draft.protocolo_puntos.push({ estacion: '', lugar: '', coordenadas: '', matriz: '' });
                }
            }

            tbody.innerHTML = '';
            draft.protocolo_puntos.forEach(function(punto, idx) {
                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td>' + (idx + 1) + '</td>' +
                    '<td><input type="text" class="form-control input-sm" data-fq-proto-field="estacion" data-fq-proto-idx="' + idx + '" value="' + (punto.estacion || '') + '"></td>' +
                    '<td><input type="text" class="form-control input-sm" data-fq-proto-field="lugar" data-fq-proto-idx="' + idx + '" value="' + (punto.lugar || '') + '"></td>' +
                    '<td><input type="text" class="form-control input-sm" data-fq-proto-field="coordenadas" data-fq-proto-idx="' + idx + '" value="' + (punto.coordenadas || '') + '"></td>' +
                    '<td><input type="text" class="form-control input-sm" data-fq-proto-field="matriz" data-fq-proto-idx="' + idx + '" value="' + (punto.matriz || '') + '"></td>' +
                    '<td><button class="btn btn-link btn-sm text-danger" data-fq-proto-remove="' + idx + '" title="Quitar"><i class="fas fa-times"></i></button></td>';
                tbody.appendChild(tr);
            });

            tbody.querySelectorAll('input[data-fq-proto-field]').forEach(function(inp) {
                inp.addEventListener('input', function() {
                    var i = parseInt(this.getAttribute('data-fq-proto-idx'), 10);
                    var f = this.getAttribute('data-fq-proto-field');
                    if (isNaN(i) || !f) return;
                    if (!techDrafts.metodologias_fq.protocolo_puntos[i]) return;
                    techDrafts.metodologias_fq.protocolo_puntos[i][f] = this.value;
                    techDrafts.metodologias_fq.dirty = true;
                    updateTechStatus('Cambios sin guardar');
                    renderTechDocView();
                    renderTechDocFull();
                });
            });

            tbody.querySelectorAll('button[data-fq-proto-remove]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var i = parseInt(this.getAttribute('data-fq-proto-remove'), 10);
                    if (isNaN(i)) return;
                    techDrafts.metodologias_fq.protocolo_puntos.splice(i, 1);
                    if (techDrafts.metodologias_fq.protocolo_puntos.length === 0) {
                        techDrafts.metodologias_fq.protocolo_puntos.push({ estacion: '', lugar: '', coordenadas: '', matriz: '' });
                    }
                    techDrafts.metodologias_fq.dirty = true;
                    updateTechStatus('Cambios sin guardar');
                    renderMetFQProtocolTable();
                    renderTechDocView();
                    renderTechDocFull();
                });
            });
        }

        function renderMetFQInSituTable() {
            var tbody = document.getElementById('techMetFQInSituTableBody');
            if (!tbody) return;
            var draft = techDrafts.metodologias_fq || {};
            var selected = draft.in_situ_selected || [];
            tbody.innerHTML = '';
            if (selected.length === 0) {
                tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#aaa;">No hay parámetros de terreno seleccionados.</td></tr>';
                return;
            }
            selected.forEach(function(item, idx) {
                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td>' + (item.parametro || '—') + '</td>' +
                    '<td>' + (item.metodo || '—') + '</td>' +
                    '<td><button class="btn btn-link btn-sm text-danger" data-insitu-remove="' + idx + '" title="Quitar"><i class="fas fa-times"></i></button></td>';
                tbody.appendChild(tr);
            });
            tbody.querySelectorAll('button[data-insitu-remove]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var i = parseInt(this.getAttribute('data-insitu-remove'), 10);
                    if (isNaN(i)) return;
                    techDrafts.metodologias_fq.in_situ_selected.splice(i, 1);
                    techDrafts.metodologias_fq.dirty = true;
                    updateTechStatus('Cambios sin guardar');
                    renderMetFQInSituTable();
                    renderTechDocView();
                    renderTechDocFull();
                });
            });
        }

        function renderMetFQSubsectionPanel() {
            var protocoloRow = document.getElementById('techMetFQProtocoloRow');
            var protocoloTableRow = document.getElementById('techMetFQProtocoloTableRow');
            var protocoloImgRow = document.getElementById('techMetFQProtocoloImgRow');
            var protocoloDescRow = document.getElementById('techMetFQProtocoloDescRow');
            var paramsIntroRow = document.getElementById('techMetFQParamsRow');
            var paramsControlRow = document.getElementById('techMetFQParamsControlRow');
            var finalRow = document.getElementById('techMetFQFinalRow');
            var inSituIntroRow = document.getElementById('techMetFQInSituIntroRow');
            var inSituControlRow = document.getElementById('techMetFQInSituControlRow');
            var inSituFinalRow = document.getElementById('techMetFQInSituFinalRow');
            [protocoloRow, protocoloTableRow, protocoloImgRow, protocoloDescRow, paramsIntroRow, paramsControlRow, finalRow, inSituIntroRow, inSituControlRow, inSituFinalRow].forEach(function(row) {
                if (row) row.style.display = 'none';
            });

            if (activeMetFQSubsection === 'parametros_laboratorios') {
                if (paramsIntroRow) paramsIntroRow.style.display = '';
                if (paramsControlRow) paramsControlRow.style.display = '';
                if (finalRow) finalRow.style.display = '';
                return;
            }
            if (activeMetFQSubsection === 'parametros_in_situ') {
                if (inSituIntroRow) inSituIntroRow.style.display = '';
                if (inSituControlRow) inSituControlRow.style.display = '';
                if (inSituFinalRow) inSituFinalRow.style.display = '';
                return;
            }
            if (protocoloRow) protocoloRow.style.display = '';
            if (protocoloTableRow) protocoloTableRow.style.display = '';
            if (protocoloImgRow) protocoloImgRow.style.display = '';
            if (protocoloDescRow) protocoloDescRow.style.display = '';
        }

        function syncActiveDraft(markDirty) {
            if (!activeTechId) return;
            if (!techDrafts[activeTechId]) {
                techDrafts[activeTechId] = { summary: '', content: '', notes: '', updatedAt: '' };
            }

            var mapCaptionInput = document.getElementById('techMapCaptionInput');
            if (activeTechId === 'objetivos') {
                techDrafts[activeTechId].objetivo = getQuillHTML('techEditorObjetivo');
                techDrafts[activeTechId].alcance = getQuillHTML('techEditorAlcance');
            } else if (activeTechId === 'normas') {
                techDrafts[activeTechId].intro = getQuillHTML('techEditorNormasIntro');
            } else if (activeTechId === 'ubicacion') {
                techDrafts[activeTechId].intro = getQuillHTML('techEditorUbicacionIntro');
                techDrafts[activeTechId].mapCaption = mapCaptionInput ? mapCaptionInput.value : '';
            } else if (activeTechId === 'profesionales') {
                techDrafts[activeTechId].intro = getQuillHTML('techEditorProfesionalesIntro');
            } else if (activeTechId === 'coordinaciones') {
                techDrafts[activeTechId].unidad_coordinadora = getQuillHTML('techEditorCoordUnidad');
                techDrafts[activeTechId].movilizacion = getQuillHTML('techEditorCoordMovilizacion');
                techDrafts[activeTechId].ropa_trabajo = getQuillHTML('techEditorCoordRopa');
            } else if (activeTechId === 'autorizaciones') {
                techDrafts[activeTechId].intro = getQuillHTML('techEditorAutorizacionesIntro');
            } else if (activeTechId === 'metodologias_fq') {
                techDrafts[activeTechId].protocolo_intro = getQuillHTML('techEditorMetFQProtocolo');
                techDrafts[activeTechId].protocolo_descripcion = getQuillHTML('techEditorMetFQProtocoloDesc');
                techDrafts[activeTechId].params_intro = getQuillHTML('techEditorMetFQParamsIntro');
                techDrafts[activeTechId].texto_final = getQuillHTML('techEditorMetFQFinal');
                techDrafts[activeTechId].in_situ_intro = getQuillHTML('techEditorMetFQInSituIntro');
                techDrafts[activeTechId].in_situ_final = getQuillHTML('techEditorMetFQInSituFinal');
            } else {
                techDrafts[activeTechId].summary = getQuillHTML('techEditorSummary');
                techDrafts[activeTechId].content = getQuillHTML('techEditorContent');
                techDrafts[activeTechId].notes = getQuillHTML('techEditorNotes');
            }

            if (markDirty) {
                techDrafts[activeTechId].dirty = true;
                updateTechStatus('Cambios sin guardar');
            }
            renderTechDocView();
            renderTechDocFull();
        }

        function selectTechItem(id) {
            if (!id) return;

            syncActiveDraft(false);
            activeTechId = id;

            var section = getAllSections().find(function(s) { return s.id === id; });
            var titleEl = document.getElementById('techEditorTitle');
            if (titleEl && section) titleEl.textContent = section.title;

            if (!techDrafts[id]) {
                techDrafts[id] = { summary: '', content: '', notes: '', updatedAt: '' };
            }

            var draft = techDrafts[id];
            var defaultFields = document.getElementById('techEditorDefaultFields');
            var objetivosFields = document.getElementById('techEditorObjetivosFields');
            var normasFields = document.getElementById('techEditorNormasFields');
            var ubicacionFields = document.getElementById('techEditorUbicacionFields');
            var mapPreview = document.getElementById('techMapPreview');
            var mapImg = document.getElementById('techMapImg');
            var mapUpload = document.getElementById('techMapUpload');
            var mapCaptionText = document.getElementById('techMapCaptionText');
            var mapCaptionInput = document.getElementById('techMapCaptionInput');
            var profesionalesFields = document.getElementById('techEditorProfesionalesFields');
            var coordinacionesFields = document.getElementById('techEditorCoordinacionesFields');
            var autorizacionesFields = document.getElementById('techEditorAutorizacionesFields');
            var metFQFields = document.getElementById('techEditorMetFQFields');
            var customFields = document.getElementById('techEditorCustomFields');
            var customContainer = document.getElementById('techCustomFieldsContainer');

            var allPanels = [defaultFields, objetivosFields, normasFields, ubicacionFields, profesionalesFields, coordinacionesFields, autorizacionesFields, metFQFields, customFields];
            allPanels.forEach(function(p) { if (p) p.style.display = 'none'; });

            suppressQuillSync = true;

            if (activeTechId === 'objetivos') {
                if (objetivosFields) objetivosFields.style.display = '';
                setQuillHTML('techEditorObjetivo', draft.objetivo || '');
                setQuillHTML('techEditorAlcance', draft.alcance || '');
            } else if (activeTechId === 'normas') {
                if (normasFields) normasFields.style.display = '';
                setQuillHTML('techEditorNormasIntro', draft.intro || '');
                renderNormasList();
            } else if (activeTechId === 'ubicacion') {
                if (ubicacionFields) ubicacionFields.style.display = '';
                setQuillHTML('techEditorUbicacionIntro', draft.intro || '');
                if (mapCaptionText) mapCaptionText.textContent = draft.mapCaption || draft.mapName || '';
                if (mapCaptionInput) mapCaptionInput.value = draft.mapCaption || draft.mapName || '';
                if (mapPreview && mapImg) {
                    if (draft.mapImage) {
                        mapImg.src = draft.mapImage;
                        mapPreview.style.display = '';
                        if (mapUpload) mapUpload.style.display = 'none';
                    } else {
                        mapPreview.style.display = 'none';
                        if (mapUpload) mapUpload.style.display = '';
                    }
                }
            } else if (activeTechId === 'profesionales') {
                if (profesionalesFields) profesionalesFields.style.display = '';
                setQuillHTML('techEditorProfesionalesIntro', draft.intro || '');
                renderProfesionalesList();
            } else if (activeTechId === 'coordinaciones') {
                if (coordinacionesFields) coordinacionesFields.style.display = '';
                setQuillHTML('techEditorCoordUnidad', draft.unidad_coordinadora || '');
                setQuillHTML('techEditorCoordMovilizacion', draft.movilizacion || '');
                setQuillHTML('techEditorCoordRopa', draft.ropa_trabajo || '');
            } else if (activeTechId === 'autorizaciones') {
                if (autorizacionesFields) autorizacionesFields.style.display = '';
                setQuillHTML('techEditorAutorizacionesIntro', draft.intro || '');
                renderAutorizacionesList();
            } else if (activeTechId === 'metodologias_fq') {
                if (metFQFields) metFQFields.style.display = '';
                setQuillHTML('techEditorMetFQProtocolo', draft.protocolo_intro || '');
                setQuillHTML('techEditorMetFQProtocoloDesc', draft.protocolo_descripcion || '');
                setQuillHTML('techEditorMetFQParamsIntro', draft.params_intro || '');
                setQuillHTML('techEditorMetFQFinal', draft.texto_final || '');
                setQuillHTML('techEditorMetFQInSituIntro', draft.in_situ_intro || '');
                setQuillHTML('techEditorMetFQInSituFinal', draft.in_situ_final || '');
                var protocolImgPreview = document.getElementById('techMetFQProtocolImgPreview');
                var protocolImgUpload = document.getElementById('techMetFQProtocolImgUpload');
                var protocolImgTag = document.getElementById('techMetFQProtocolImgTag');
                if (draft.protocolo_imagen) {
                    if (protocolImgTag) protocolImgTag.src = draft.protocolo_imagen;
                    if (protocolImgPreview) protocolImgPreview.style.display = '';
                    if (protocolImgUpload) protocolImgUpload.style.display = 'none';
                } else {
                    if (protocolImgPreview) protocolImgPreview.style.display = 'none';
                    if (protocolImgUpload) protocolImgUpload.style.display = '';
                }
                renderMetFQSubsectionPanel();
                renderMetFQProtocolTable();
                renderMetFQTable();
                renderMetFQInSituTable();
            } else if (section && section.isCustom) {
                if (customFields) customFields.style.display = '';
                if (customContainer) {
                    Object.keys(quillEditors).forEach(function(key) {
                        if (key.indexOf('techCustomQuill_') === 0) delete quillEditors[key];
                    });
                    customContainer.innerHTML = (section.fields || []).map(function(field, idx) {
                        return '<div class="tech-custom-field">' +
                            '<label>' + field + '</label>' +
                            '<div class="quill-editor" id="techCustomQuill_' + idx + '" data-custom-field="' + field + '"></div>' +
                        '</div>';
                    }).join('') || '<div class="tech-editor-hint">No hay campos definidos.</div>';
                    (section.fields || []).forEach(function(field, idx) {
                        var editorId = 'techCustomQuill_' + idx;
                        var value = (draft.fields && draft.fields[field]) ? draft.fields[field] : '';
                        var quill = initQuillEditor(editorId, '', 3);
                        if (quill && value) setQuillHTML(editorId, value);
                        if (quill) {
                            quill.on('text-change', function(delta, oldDelta, source) {
                                if (suppressQuillSync || source !== 'user') return;
                                if (!techDrafts[activeTechId].fields) techDrafts[activeTechId].fields = {};
                                techDrafts[activeTechId].fields[field] = getQuillHTML(editorId);
                                updateTechStatus('Cambios sin guardar');
                                renderTechDocFull();
                            });
                        }
                    });
                }
            } else {
                if (defaultFields) defaultFields.style.display = '';
                setQuillHTML('techEditorSummary', draft.summary || '');
                setQuillHTML('techEditorContent', draft.content || '');
                setQuillHTML('techEditorNotes', draft.notes || '');
            }

            suppressQuillSync = false;

            if (draft.updatedAt) {
                updateTechStatus('Guardado ' + draft.updatedAt);
            } else {
                updateTechStatus('Sin cambios');
            }

            buildTechTree();
            renderTechDocView();
        }

        document.addEventListener('DOMContentLoaded', function() {
            var editorConfigs = [
                ['techEditorSummary', 'Resumen corto de la sección', 3],
                ['techEditorContent', 'Redacta el contenido técnico aquí', 8],
                ['techEditorNotes', 'Notas internas para el equipo', 3],
                ['techEditorObjetivo', 'Describe el objetivo general y específicos', 6],
                ['techEditorAlcance', 'Describe el alcance del servicio', 6],
                ['techEditorNormasIntro', 'Describe el marco normativo aplicable', 4],
                ['techEditorUbicacionIntro', 'Describe la ubicación del servicio', 4],
                ['techEditorProfesionalesIntro', 'Describe el rol del equipo profesional', 4],
                ['techEditorCoordUnidad', 'Describe la unidad coordinadora del servicio', 4],
                ['techEditorCoordMovilizacion', 'Describe los aspectos de movilización y vehículos', 6],
                ['techEditorCoordRopa', 'Describe los elementos de protección personal', 6],
                ['techEditorAutorizacionesIntro', 'Describe el contexto de las autorizaciones', 3],
                ['techEditorMetFQProtocolo', 'Describe el protocolo de muestreo o estudio', 4],
                ['techEditorMetFQProtocoloDesc', 'Descripción del protocolo de muestreo para componentes físico-químicos', 4],
                ['techEditorMetFQParamsIntro', 'Texto introductorio para el control de análisis de laboratorio', 4],
                ['techEditorMetFQFinal', 'Texto final de cierre para la sección', 4],
                ['techEditorMetFQInSituIntro', 'Texto introductorio para parámetros medidos in situ', 4],
                ['techEditorMetFQInSituFinal', 'Texto final para parámetros medidos in situ', 4]
            ];
            editorConfigs.forEach(function(cfg) {
                var quill = initQuillEditor(cfg[0], cfg[1], cfg[2]);
                if (quill) {
                    quill.on('text-change', function(delta, oldDelta, source) {
                        if (suppressQuillSync || source !== 'user') return;
                        syncActiveDraft(true);
                    });
                }
            });
            var mapCaptionInput = document.getElementById('techMapCaptionInput');
            if (mapCaptionInput) {
                mapCaptionInput.addEventListener('input', function() { syncActiveDraft(true); });
            }

            var metFQAddProtocolPointBtn = document.getElementById('techMetFQAddProtocolPoint');
            if (metFQAddProtocolPointBtn) {
                metFQAddProtocolPointBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (!techDrafts.metodologias_fq.protocolo_puntos) techDrafts.metodologias_fq.protocolo_puntos = [];
                    techDrafts.metodologias_fq.protocolo_puntos.push({ estacion: '', lugar: '', coordenadas: '', matriz: '' });
                    techDrafts.metodologias_fq.dirty = true;
                    updateTechStatus('Cambios sin guardar');
                    renderMetFQProtocolTable();
                    renderTechDocView();
                    renderTechDocFull();
                });
            }

            var protocolImgUploadDiv = document.getElementById('techMetFQProtocolImgUpload');
            var protocolImgFileInput = document.getElementById('techMetFQProtocolImgInput');
            var protocolImgRemoveBtn = document.getElementById('techMetFQProtocolImgRemove');
            if (protocolImgUploadDiv && protocolImgFileInput) {
                protocolImgUploadDiv.addEventListener('click', function() { protocolImgFileInput.click(); });
                protocolImgFileInput.addEventListener('change', function() {
                    var file = this.files && this.files[0];
                    if (!file) return;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        techDrafts.metodologias_fq.protocolo_imagen = e.target.result;
                        techDrafts.metodologias_fq.protocolo_imagen_name = file.name;
                        techDrafts.metodologias_fq.dirty = true;
                        updateTechStatus('Cambios sin guardar');
                        var tag = document.getElementById('techMetFQProtocolImgTag');
                        var prev = document.getElementById('techMetFQProtocolImgPreview');
                        if (tag) tag.src = e.target.result;
                        if (prev) prev.style.display = '';
                        protocolImgUploadDiv.style.display = 'none';
                        renderTechDocView();
                        renderTechDocFull();
                    };
                    reader.readAsDataURL(file);
                });
            }
            if (protocolImgRemoveBtn) {
                protocolImgRemoveBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    techDrafts.metodologias_fq.protocolo_imagen = '';
                    techDrafts.metodologias_fq.protocolo_imagen_name = '';
                    techDrafts.metodologias_fq.dirty = true;
                    updateTechStatus('Cambios sin guardar');
                    var prev = document.getElementById('techMetFQProtocolImgPreview');
                    if (prev) prev.style.display = 'none';
                    if (protocolImgUploadDiv) protocolImgUploadDiv.style.display = '';
                    if (protocolImgFileInput) protocolImgFileInput.value = '';
                    renderTechDocView();
                    renderTechDocFull();
                });
            }

            var editBtn = document.getElementById('techViewEditBtn');
            var docBtn = document.getElementById('techViewDocBtn');
            var editView = document.getElementById('techViewEdit');
            var docView = document.getElementById('techViewDoc');
            var editShell = document.getElementById('techEditShell');
            var docFull = document.getElementById('techDocFull');
            function setTechView(mode) {
                if (!editView || !docView || !editBtn || !docBtn) return;
                if (mode === 'doc') {
                    editView.style.display = 'none';
                    docView.style.display = '';
                    editBtn.classList.remove('active');
                    docBtn.classList.add('active');
                    renderTechDocView();
                    if (editShell) editShell.style.display = 'none';
                    if (docFull) docFull.style.display = '';
                    renderTechDocFull();
                } else {
                    editView.style.display = '';
                    docView.style.display = 'none';
                    docBtn.classList.remove('active');
                    editBtn.classList.add('active');
                    if (editShell) editShell.style.display = '';
                    if (docFull) docFull.style.display = 'none';
                }
            }
            if (editBtn) editBtn.addEventListener('click', function() { setTechView('edit'); });
            if (docBtn) docBtn.addEventListener('click', function() { setTechView('doc'); });
            setTechView('edit');


            var btnSave = document.getElementById('techEditorSave');
            if (btnSave) {
                btnSave.addEventListener('click', function() {
                    if (!activeTechId) return;
                    syncActiveDraft(false);
                    var now = new Date();
                    var dateStr = ('0' + now.getDate()).slice(-2) + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + now.getFullYear() + ' ' + ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);
                    techDrafts[activeTechId].updatedAt = dateStr;
                    techDrafts[activeTechId].dirty = false;
                    updateTechStatus('Guardado ' + dateStr);
                });
            }

            var btnClear = document.getElementById('techEditorClear');
            if (btnClear) {
                btnClear.addEventListener('click', function() {
                    if (!activeTechId) return;
                if (!confirm('Limpiar el contenido de esta sección?')) return;
                if (activeTechId === 'objetivos') {
                    techDrafts[activeTechId] = { objetivo: '', alcance: '', updatedAt: '' };
                } else if (activeTechId === 'normas') {
                    techDrafts[activeTechId] = { intro: '', normas: [], updatedAt: '' };
                } else if (activeTechId === 'metodologias_fq') {
                    techDrafts[activeTechId] = { protocolo_intro: '', protocolo_puntos: [], protocolo_imagen: '', protocolo_imagen_name: '', protocolo_descripcion: '', selectedParams: [], params_intro: '', texto_final: '', in_situ_intro: '', in_situ_selected: [], in_situ_final: '', updatedAt: '' };
                } else {
                    techDrafts[activeTechId] = { summary: '', content: '', notes: '', updatedAt: '' };
                }
                    selectTechItem(activeTechId);
                    updateTechStatus('Sin cambios');
                });
            }

            var openModalBtn = document.getElementById('techOpenNormasModal');
            var modal = document.getElementById('normasModal');
            var modalClose = document.getElementById('normasModalClose');
            var modalSearch = document.getElementById('normasModalSearch');
            var modalList = document.getElementById('normasModalList');
            var modalApply = document.getElementById('normasModalApply');

            function renderNormasModalList(filterText) {
                if (!modalList) return;
                var filter = (filterText || '').toLowerCase().trim();
                var selected = techDrafts.normas ? (techDrafts.normas.selected || []) : [];
                var normas = techNormaCatalog.slice();
                selected.forEach(function(n) {
                    if (normas.indexOf(n) === -1) normas.push(n);
                });
                if (filter) {
                    normas = normas.filter(function(n) { return n.toLowerCase().indexOf(filter) !== -1; });
                }
                if (normas.length === 0) {
                    modalList.innerHTML = '<div class="tech-editor-hint">Sin resultados.</div>';
                    return;
                }
                modalList.innerHTML = normas.map(function(norma, idx) {
                    var checked = selected.indexOf(norma) !== -1 ? ' checked' : '';
                    return '<label class="simple-modal-item">' +
                        '<input type="checkbox" data-modal-norma="' + idx + '"' + checked + '>' +
                        '<span>' + norma + '</span>' +
                    '</label>';
                }).join('');

                modalList.querySelectorAll('input[type="checkbox"]').forEach(function(box) {
                    box.addEventListener('change', function() {
                        var index = parseInt(this.getAttribute('data-modal-norma'), 10);
                        if (isNaN(index)) return;
                        var norma = normas[index];
                        var pos = selected.indexOf(norma);
                        if (this.checked && pos === -1) selected.push(norma);
                        if (!this.checked && pos !== -1) selected.splice(pos, 1);
                        techDrafts.normas.selected = selected;
                        updateNormasSelected();
                        updateTechStatus('Cambios sin guardar');
                    });
                });
            }

            function openNormasModal() {
                if (!modal) return;
                modal.style.display = 'flex';
                if (modalSearch) modalSearch.value = '';
                renderNormasModalList('');
            }

            function closeNormasModal() {
                if (!modal) return;
                modal.style.display = 'none';
            }

            if (openModalBtn) {
                openModalBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    openNormasModal();
                });
            }
            if (modalClose) {
                modalClose.addEventListener('click', function() {
                    closeNormasModal();
                });
            }
            if (modal) {
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) closeNormasModal();
                });
            }
            if (modalSearch) {
                modalSearch.addEventListener('input', function() {
                    renderNormasModalList(this.value);
                });
            }
            if (modalApply) {
                modalApply.addEventListener('click', function() {
                    closeNormasModal();
                });
            }

            var authModalBtn = document.getElementById('techOpenAuthModal');
            var authModal = document.getElementById('autorizacionesModal');
            var authModalClose = document.getElementById('autorizacionesModalClose');
            var authModalSearch = document.getElementById('autorizacionesModalSearch');
            var authModalList = document.getElementById('autorizacionesModalList');
            var authModalApply = document.getElementById('autorizacionesModalApply');

            function renderAutorizacionesModalList(filterText) {
                if (!authModalList) return;
                var filter = (filterText || '').toLowerCase().trim();
                var selected = techDrafts.autorizaciones ? (techDrafts.autorizaciones.selected || []) : [];
                var items = techAutorizacionCatalog.slice();
                if (filter) {
                    items = items.filter(function(n) { return (n.name + ' ' + n.text).toLowerCase().indexOf(filter) !== -1; });
                }
                if (items.length === 0) {
                    authModalList.innerHTML = '<div class="tech-editor-hint">Sin resultados.</div>';
                    return;
                }
                authModalList.innerHTML = items.map(function(item, idx) {
                    var checked = selected.some(function(sel) { return sel.name === item.name; }) ? ' checked' : '';
                    return '<label class="simple-modal-item">' +
                        '<input type="checkbox" data-modal-auth="' + idx + '"' + checked + '>' +
                        '<span><strong>' + item.name + '</strong><br>' + item.text + '</span>' +
                    '</label>';
                }).join('');

                authModalList.querySelectorAll('input[type="checkbox"]').forEach(function(box) {
                    box.addEventListener('change', function() {
                        var index = parseInt(this.getAttribute('data-modal-auth'), 10);
                        if (isNaN(index)) return;
                        var auth = items[index];
                        var pos = selected.findIndex(function(sel) { return sel.name === auth.name; });
                        if (this.checked && pos === -1) selected.push(auth);
                        if (!this.checked && pos !== -1) selected.splice(pos, 1);
                        techDrafts.autorizaciones.selected = selected;
                        renderAutorizacionesList();
                        updateTechStatus('Cambios sin guardar');
                    });
                });
            }

            function openAutorizacionesModal() {
                if (!authModal) return;
                authModal.style.display = 'flex';
                if (authModalSearch) authModalSearch.value = '';
                renderAutorizacionesModalList('');
            }

            function closeAutorizacionesModal() {
                if (!authModal) return;
                authModal.style.display = 'none';
            }

            if (authModalBtn) {
                authModalBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    openAutorizacionesModal();
                });
            }
            if (authModalClose) {
                authModalClose.addEventListener('click', function() {
                    closeAutorizacionesModal();
                });
            }
            if (authModal) {
                authModal.addEventListener('click', function(e) {
                    if (e.target === authModal) closeAutorizacionesModal();
                });
            }
            if (authModalSearch) {
                authModalSearch.addEventListener('input', function() {
                    renderAutorizacionesModalList(this.value);
                });
            }
            if (authModalApply) {
                authModalApply.addEventListener('click', function() {
                    closeAutorizacionesModal();
                });
            }

            var addTopicBtn = document.getElementById('techAddTopicBtn');
            var customModal = document.getElementById('customTopicModal');
            var customModalClose = document.getElementById('customTopicModalClose');
            var customTitle = document.getElementById('customTopicTitle');
            var customFields = document.getElementById('customTopicFields');
            var customCancel = document.getElementById('customTopicCancel');
            var customCreate = document.getElementById('customTopicCreate');

            function openCustomModal() {
                if (!customModal) return;
                customModal.style.display = 'flex';
                if (customTitle) customTitle.value = '';
                if (customFields) customFields.value = '';
            }

            function closeCustomModal() {
                if (!customModal) return;
                customModal.style.display = 'none';
            }

            function slugify(text) {
                return (text || '')
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
            }

            function createCustomTopic() {
                var title = (customTitle && customTitle.value || '').trim();
                var fieldsRaw = (customFields && customFields.value || '').trim();
                if (!title) return;
                var fields = fieldsRaw
                    ? fieldsRaw.split(/\r?\n|,/).map(function(f) { return f.trim(); }).filter(Boolean)
                    : [];
                var id = 'custom-' + slugify(title) + '-' + Date.now();
                techCustomSections.push({
                    id: id,
                    title: title,
                    group: 'Personalizado',
                    icon: 'file-alt',
                    enabled: true,
                    isCustom: true,
                    fields: fields
                });
                if (!techSectionOrder) techSectionOrder = [];
                techSectionOrder.push(id);
                techDrafts[id] = { fields: {} };
                techTreeState.expanded[id] = true;
                closeCustomModal();
                buildTechTree();
                selectTechItem(id);
            }

            function addQuickCustomTopic() {
                var id = 'custom-' + Date.now();
                techCustomSections.push({
                    id: id,
                    title: 'Nueva sección',
                    group: 'Personalizado',
                    icon: 'file-alt',
                    enabled: true,
                    isCustom: true,
                    fields: [],
                    _editable: true
                });
                if (!techSectionOrder) techSectionOrder = [];
                techSectionOrder.push(id);
                techDrafts[id] = { fields: {} };
                techTreeState.expanded[id] = true;
                buildTechTree();
                selectTechItem(id);
                var nameEl = document.querySelector('[data-tech-name="' + id + '"]');
                if (nameEl) {
                    var input = document.createElement('input');
                    input.type = 'text';
                    input.value = 'Nueva sección';
                    input.className = 'tech-map-caption-input';
                    nameEl.replaceWith(input);
                    input.focus();
                    input.select();
                    function save() {
                        var section = getAllSections().find(function(s) { return s.id === id; });
                        if (section) {
                            section.title = input.value.trim() || 'Nueva sección';
                            section._editable = false;
                        }
                        buildTechTree();
                        selectTechItem(id);
                    }
                    input.addEventListener('blur', save);
                    input.addEventListener('keydown', function(ev) {
                        if (ev.key === 'Enter') {
                            ev.preventDefault();
                            input.blur();
                        }
                    });
                }
            }

            if (addTopicBtn) addTopicBtn.addEventListener('click', function(e) {
                e.preventDefault();
                addQuickCustomTopic();
            });
            if (customModalClose) customModalClose.addEventListener('click', closeCustomModal);
            if (customCancel) customCancel.addEventListener('click', function(e) { e.preventDefault(); closeCustomModal(); });
            if (customCreate) customCreate.addEventListener('click', function(e) { e.preventDefault(); createCustomTopic(); });
            if (customModal) {
                customModal.addEventListener('click', function(e) {
                    if (e.target === customModal) closeCustomModal();
                });
            }

            var proModalBtn = document.getElementById('techOpenProModal');
            var proModal = document.getElementById('profesionalesModal');
            var proModalClose = document.getElementById('profesionalesModalClose');
            var proModalSearch = document.getElementById('profesionalesModalSearch');
            var proModalList = document.getElementById('profesionalesModalList');
            var proModalApply = document.getElementById('profesionalesModalApply');

            function renderProfesionalesModalList(filterText) {
                if (!proModalList) return;
                var filter = (filterText || '').toLowerCase().trim();
                var selected = techDrafts.profesionales ? (techDrafts.profesionales.selected || []) : [];
                var items = techProfesionalCatalog.slice();
                if (filter) {
                    items = items.filter(function(n) { return n.toLowerCase().indexOf(filter) !== -1; });
                }
                if (items.length === 0) {
                    proModalList.innerHTML = '<div class="tech-editor-hint">Sin resultados.</div>';
                    return;
                }
                proModalList.innerHTML = items.map(function(item, idx) {
                    var checked = selected.indexOf(item) !== -1 ? ' checked' : '';
                    return '<label class="simple-modal-item">' +
                        '<input type="checkbox" data-modal-pro="' + idx + '"' + checked + '>' +
                        '<span>' + item + '</span>' +
                    '</label>';
                }).join('');

                proModalList.querySelectorAll('input[type="checkbox"]').forEach(function(box) {
                    box.addEventListener('change', function() {
                        var index = parseInt(this.getAttribute('data-modal-pro'), 10);
                        if (isNaN(index)) return;
                        var pro = items[index];
                        var pos = selected.indexOf(pro);
                        if (this.checked && pos === -1) selected.push(pro);
                        if (!this.checked && pos !== -1) selected.splice(pos, 1);
                        techDrafts.profesionales.selected = selected;
                        renderProfesionalesList();
                        updateTechStatus('Cambios sin guardar');
                    });
                });
            }

            function openProfesionalesModal() {
                if (!proModal) return;
                proModal.style.display = 'flex';
                if (proModalSearch) proModalSearch.value = '';
                renderProfesionalesModalList('');
            }

            function closeProfesionalesModal() {
                if (!proModal) return;
                proModal.style.display = 'none';
            }

            if (proModalBtn) {
                proModalBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    openProfesionalesModal();
                });
            }
            if (proModalClose) {
                proModalClose.addEventListener('click', function() {
                    closeProfesionalesModal();
                });
            }
            if (proModal) {
                proModal.addEventListener('click', function(e) {
                    if (e.target === proModal) closeProfesionalesModal();
                });
            }
            if (proModalSearch) {
                proModalSearch.addEventListener('input', function() {
                    renderProfesionalesModalList(this.value);
                });
            }
            if (proModalApply) {
                proModalApply.addEventListener('click', function() {
                    closeProfesionalesModal();
                });
            }

            var fqModalBtn = document.getElementById('techOpenFQParametrosModal');
            var fqModal = document.getElementById('fqParametrosModal');
            var fqModalClose = document.getElementById('fqParametrosModalClose');
            var fqModalSearch = document.getElementById('fqParametrosModalSearch');
            var fqModalList = document.getElementById('fqParametrosModalList');
            var fqModalApply = document.getElementById('fqParametrosModalApply');

            function renderFQParametrosModalList(filterText) {
                if (!fqModalList) return;
                var filter = (filterText || '').toLowerCase().trim();
                var selected = techDrafts.metodologias_fq ? (techDrafts.metodologias_fq.selectedParams || []) : [];
                var items = techFQParametroCatalog.slice();
                if (filter) {
                    items = items.filter(function(item) {
                        return (item.parametro + ' ' + item.metodologia + ' ' + item.laboratorios).toLowerCase().indexOf(filter) !== -1;
                    });
                }
                if (items.length === 0) {
                    fqModalList.innerHTML = '<div class="tech-editor-hint">Sin resultados.</div>';
                    return;
                }
                fqModalList.innerHTML = items.map(function(item, idx) {
                    var checked = selected.some(function(sel) { return sel.parametro === item.parametro; }) ? ' checked' : '';
                    return '<label class="simple-modal-item">' +
                        '<input type="checkbox" data-modal-fq-param="' + idx + '"' + checked + '>' +
                        '<span><strong>' + item.parametro + '</strong><br>' + item.unidad + ' | LD: ' + item.limite + '</span>' +
                    '</label>';
                }).join('');

                fqModalList.querySelectorAll('input[type="checkbox"]').forEach(function(box) {
                    box.addEventListener('change', function() {
                        var index = parseInt(this.getAttribute('data-modal-fq-param'), 10);
                        if (isNaN(index)) return;
                        var param = items[index];
                        var pos = selected.findIndex(function(sel) { return sel.parametro === param.parametro; });
                        if (this.checked && pos === -1) selected.push(Object.assign({}, param));
                        if (!this.checked && pos !== -1) selected.splice(pos, 1);
                        techDrafts.metodologias_fq.selectedParams = selected;
                        techDrafts.metodologias_fq.dirty = true;
                        renderMetFQTable();
                        updateTechStatus('Cambios sin guardar');
                        renderTechDocView();
                        renderTechDocFull();
                    });
                });
            }

            function openFQParametrosModal() {
                if (!fqModal) return;
                fqModal.style.display = 'flex';
                if (fqModalSearch) fqModalSearch.value = '';
                renderFQParametrosModalList('');
            }

            function closeFQParametrosModal() {
                if (!fqModal) return;
                fqModal.style.display = 'none';
            }

            if (fqModalBtn) {
                fqModalBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    openFQParametrosModal();
                });
            }
            if (fqModalClose) {
                fqModalClose.addEventListener('click', function() {
                    closeFQParametrosModal();
                });
            }
            if (fqModal) {
                fqModal.addEventListener('click', function(e) {
                    if (e.target === fqModal) closeFQParametrosModal();
                });
            }
            if (fqModalSearch) {
                fqModalSearch.addEventListener('input', function() {
                    renderFQParametrosModalList(this.value);
                });
            }
            if (fqModalApply) {
                fqModalApply.addEventListener('click', function() {
                    closeFQParametrosModal();
                });
            }

            var inSituModalBtn = document.getElementById('techOpenInSituModal');
            var inSituModal = document.getElementById('inSituModal');
            var inSituModalClose = document.getElementById('inSituModalClose');
            var inSituModalSearch = document.getElementById('inSituModalSearch');
            var inSituModalList = document.getElementById('inSituModalList');
            var inSituModalApply = document.getElementById('inSituModalApply');

            function renderInSituModalList(filterText) {
                if (!inSituModalList) return;
                var filter = (filterText || '').toLowerCase().trim();
                var selected = techDrafts.metodologias_fq ? (techDrafts.metodologias_fq.in_situ_selected || []) : [];
                var items = techInSituCatalog.slice();
                if (filter) {
                    items = items.filter(function(item) {
                        return (item.parametro + ' ' + item.metodo).toLowerCase().indexOf(filter) !== -1;
                    });
                }
                if (items.length === 0) {
                    inSituModalList.innerHTML = '<div class="tech-editor-hint">Sin resultados.</div>';
                    return;
                }
                inSituModalList.innerHTML = items.map(function(item, idx) {
                    var checked = selected.some(function(sel) { return sel.parametro === item.parametro; }) ? ' checked' : '';
                    return '<label class="simple-modal-item">' +
                        '<input type="checkbox" data-modal-insitu-param="' + idx + '"' + checked + '>' +
                        '<span><strong>' + item.parametro + '</strong><br>' + item.metodo + '</span>' +
                    '</label>';
                }).join('');

                inSituModalList.querySelectorAll('input[type="checkbox"]').forEach(function(box) {
                    box.addEventListener('change', function() {
                        var index = parseInt(this.getAttribute('data-modal-insitu-param'), 10);
                        if (isNaN(index)) return;
                        var item = items[index];
                        var pos = selected.findIndex(function(sel) { return sel.parametro === item.parametro; });
                        if (this.checked && pos === -1) selected.push(Object.assign({}, item));
                        if (!this.checked && pos !== -1) selected.splice(pos, 1);
                        techDrafts.metodologias_fq.in_situ_selected = selected;
                        techDrafts.metodologias_fq.dirty = true;
                        renderMetFQInSituTable();
                        updateTechStatus('Cambios sin guardar');
                        renderTechDocView();
                        renderTechDocFull();
                    });
                });
            }

            function openInSituModal() {
                if (!inSituModal) return;
                inSituModal.style.display = 'flex';
                if (inSituModalSearch) inSituModalSearch.value = '';
                renderInSituModalList('');
            }

            function closeInSituModal() {
                if (!inSituModal) return;
                inSituModal.style.display = 'none';
            }

            if (inSituModalBtn) {
                inSituModalBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    openInSituModal();
                });
            }
            if (inSituModalClose) {
                inSituModalClose.addEventListener('click', function() {
                    closeInSituModal();
                });
            }
            if (inSituModal) {
                inSituModal.addEventListener('click', function(e) {
                    if (e.target === inSituModal) closeInSituModal();
                });
            }
            if (inSituModalSearch) {
                inSituModalSearch.addEventListener('input', function() {
                    renderInSituModalList(this.value);
                });
            }
            if (inSituModalApply) {
                inSituModalApply.addEventListener('click', function() {
                    closeInSituModal();
                });
            }

            var mapUpload = document.getElementById('techMapUpload');
            var mapInput = document.getElementById('techMapInput');
            var mapPreview = document.getElementById('techMapPreview');
            var mapImg = document.getElementById('techMapImg');
            var mapRemoveBtn = document.getElementById('techMapRemoveBtn');
            var mapCaptionText = document.getElementById('techMapCaptionText');
            var mapCaptionInput = document.getElementById('techMapCaptionInput');
            var mapCaptionEdit = document.getElementById('techMapCaptionEdit');
            if (mapUpload && mapInput) {
                mapUpload.addEventListener('click', function() {
                    mapInput.click();
                });
            }
            if (mapInput) {
                mapInput.addEventListener('change', function() {
                    if (!this.files || this.files.length === 0) return;
                    var file = this.files[0];
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        if (!techDrafts.ubicacion) return;
                        techDrafts.ubicacion.mapImage = e.target.result;
                        techDrafts.ubicacion.mapName = file.name;
                        if (mapImg) mapImg.src = e.target.result;
                        if (mapCaptionText) mapCaptionText.textContent = techDrafts.ubicacion.mapCaption || file.name;
                        if (mapCaptionInput) mapCaptionInput.value = techDrafts.ubicacion.mapCaption || file.name;
                        if (mapPreview) mapPreview.style.display = '';
                        if (mapUpload) mapUpload.style.display = 'none';
                        updateTechStatus('Cambios sin guardar');
                    };
                    reader.readAsDataURL(file);
                });
            }
            if (mapRemoveBtn) {
                mapRemoveBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (!techDrafts.ubicacion) return;
                    techDrafts.ubicacion.mapImage = '';
                    techDrafts.ubicacion.mapName = '';
                    techDrafts.ubicacion.mapCaption = '';
                    if (mapImg) mapImg.src = '';
                    if (mapPreview) mapPreview.style.display = 'none';
                    if (mapCaptionText) mapCaptionText.textContent = '';
                    if (mapCaptionInput) mapCaptionInput.value = '';
                    if (mapUpload) mapUpload.style.display = '';
                    if (mapInput) mapInput.value = '';
                    updateTechStatus('Cambios sin guardar');
                });
            }
            if (mapCaptionEdit && mapCaptionInput && mapCaptionText) {
                mapCaptionEdit.addEventListener('click', function(e) {
                    e.preventDefault();
                    mapCaptionInput.style.display = '';
                    mapCaptionText.style.display = 'none';
                    mapCaptionEdit.style.display = 'none';
                    mapCaptionInput.focus();
                });
                mapCaptionInput.addEventListener('blur', function() {
                    var value = (mapCaptionInput.value || '').trim();
                    techDrafts.ubicacion.mapCaption = value;
                    mapCaptionText.textContent = value || (techDrafts.ubicacion.mapName || '');
                    mapCaptionText.style.display = '';
                    mapCaptionEdit.style.display = '';
                    mapCaptionInput.style.display = 'none';
                    updateTechStatus('Cambios sin guardar');
                });
                mapCaptionInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        mapCaptionInput.blur();
                    }
                });
            }

            buildTechTree();
            if (techSections.length > 0) {
                selectTechItem(techSections[0].id);
            }
        });
