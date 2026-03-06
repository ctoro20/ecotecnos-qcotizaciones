        let currentStep = 1;
        let viewingStep = 1;
        let selectedClient = null;
        let quoteSaved = false;
        let draggedLabGroup = null;
        let labDropTarget = null;
        let labDropInsertAfter = false;
        let draggedServiceRow = null;
        let serviceDropTargetRow = null;
        let serviceDropInsertAfter = false;

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
            var targetStep = parseInt(params.get('step') || '', 10);
            if (!isNaN(targetStep) && targetStep >= 1 && targetStep <= 6) {
                while (currentStep < targetStep) {
                    nextStep(currentStep + 1);
                }
                if (currentStep > targetStep) {
                    currentStep = targetStep;
                    viewingStep = targetStep;
                    showStepPanel(targetStep);
                    document.querySelectorAll('.stepper-item').forEach(function(item) {
                        item.classList.remove('active', 'viewing');
                        var stepNum = parseInt(item.getAttribute('data-step') || '0', 10);
                        item.classList.toggle('completed', stepNum > 0 && stepNum < targetStep);
                    });
                    var activeItem = document.querySelector('.stepper-item[data-step="' + targetStep + '"]');
                    if (activeItem) activeItem.classList.add('active');
                    updateStepperViewing(targetStep);
                }
            }
            if (params.get('auth_review') === '1') {
                var requestUser = params.get('auth_user') || getCurrentUserName();
                var requestComment = params.get('auth_comment') || 'Solicitud de autorizacion enviada para revision.';
                var requestDate = formatApprovalDateTime(new Date());
                approvalWorkflow.status = 'requested';
                approvalWorkflow.lastRequest = { user: requestUser, date: requestDate, comment: requestComment };
                approvalWorkflow.log = [{
                    date: requestDate,
                    action: 'Solicitud',
                    user: requestUser,
                    comment: requestComment
                }];
                setQuoteSummaryStatus('Pendiente de autorización');
                renderApprovalWorkflowUI();
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

            // Mantenerse en paso 1 por defecto al abrir desde "Editar".
            // La navegación a otro paso se controla por querystring (step=...).

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

        function ensureSummaryDrawerReady() {
            var popup = document.getElementById('summaryDrawer');
            if (!popup) {
                var wrapper = document.createElement('div');
                wrapper.innerHTML =
                    '<div class="summary-drawer-overlay" id="summaryDrawer">' +
                        '<div class="summary-drawer">' +
                            '<div class="summary-drawer-header">' +
                                '<span>Resumen de la propuesta</span>' +
                            '</div>' +
                            '<div class="summary-drawer-meta">' +
                                '<div class="sdm-item">' +
                                    '<i class="fas fa-hashtag"></i>' +
                                    '<span class="sdm-label">Cotización</span>' +
                                    '<strong id="drawerQuoteNumber">—</strong>' +
                                '</div>' +
                                '<span class="sdm-sep">|</span>' +
                                '<div class="sdm-item">' +
                                    '<i class="fas fa-building"></i>' +
                                    '<span class="sdm-label">Cliente</span>' +
                                    '<strong id="drawerClient">—</strong>' +
                                '</div>' +
                                '<span class="sdm-sep">|</span>' +
                                '<div class="sdm-item">' +
                                    '<i class="far fa-calendar-alt"></i>' +
                                    '<span class="sdm-label">Fecha</span>' +
                                    '<strong id="drawerDate">—</strong>' +
                                '</div>' +
                                '<span class="sdm-sep">|</span>' +
                                '<div class="sdm-item">' +
                                    '<i class="fas fa-flag"></i>' +
                                    '<span class="sdm-label">Estado</span>' +
                                    '<strong id="drawerStatus">—</strong>' +
                                '</div>' +
                            '</div>' +
                            '<div class="summary-drawer-body">' +
                                '<div class="summary-doc">' +
                                    '<h5>Servicios</h5>' +
                                    '<table class="summary-table">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th style="width:32px;">#</th>' +
                                                '<th>Servicio</th>' +
                                                '<th style="width:80px;">Precio Unit.</th>' +
                                                '<th style="width:60px;">Cant</th>' +
                                                '<th style="width:70px;">Desc %</th>' +
                                                '<th style="width:80px;">Total</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tbody id="summaryServicesBody"></tbody>' +
                                    '</table>' +
                                    '<div class="summary-total">Total: <span id="summaryServicesTotal" style="margin-left:8px;">0.00 / CLU</span></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="summary-drawer-footer">' +
                                '<button class="btn btn-default btn-sm" type="button" onclick="closeBlankSummaryPopup()">Cerrar</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                popup = wrapper.firstElementChild;
                document.body.appendChild(popup);
            } else if (popup.parentElement !== document.body) {
                document.body.appendChild(popup);
            }
            return popup;
        }

        function openBlankSummaryPopup() {
            var popup = ensureSummaryDrawerReady();
            if (popup) {
                updateHeaderServicesSummary();
                var el = document.getElementById('drawerQuoteNumber');
                if (el) el.textContent = (document.getElementById('summaryQuoteNumber')?.textContent || '—').trim();
                el = document.getElementById('drawerClient');
                if (el) el.textContent = (document.getElementById('summaryClient')?.textContent || '—').trim();
                el = document.getElementById('drawerDate');
                if (el) el.textContent = (document.getElementById('summaryDate')?.textContent || '—').trim();
                el = document.getElementById('drawerStatus');
                if (el) {
                    var statusText = (document.querySelector('#summaryStatus span:last-child')?.textContent || '').trim();
                    el.textContent = statusText || '—';
                }
                popup.style.display = 'flex';
                popup.classList.add('show');
                document.body.classList.add('no-scroll');
            }
        }

        function closeBlankSummaryPopup() {
            var popup = document.getElementById('summaryDrawer');
            if (popup) {
                popup.classList.remove('show');
                popup.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }
        }

        // Exponer explícitamente para handlers inline (fallback robusto).
        window.openBlankSummaryPopup = openBlankSummaryPopup;
        window.closeBlankSummaryPopup = closeBlankSummaryPopup;

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
                tbody.innerHTML = '<tr class="empty-row"><td colspan="12" style="text-align:center;color:#9a9a9a;">Sin servicios en este grupo.</td></tr>';
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
                syncLabRowComputedValues(tr);
                ensureLabSecondaryRow(
                    tr,
                    findLabControl(tr, '.js-lab-laboratorio') ? findLabControl(tr, '.js-lab-laboratorio').value : 'Santiago',
                    findLabControl(tr, '.js-lab-tiempo') ? findLabControl(tr, '.js-lab-tiempo').value : '12',
                    !!(findLabControl(tr, '.js-lab-etfa') && findLabControl(tr, '.js-lab-etfa').checked)
                );
                var totalCell = tr.querySelectorAll('td')[10];
                if (totalCell) {
                    var totalVal = parseFloat(totalCell.textContent.replace(',', '.')) || 0;
                    subtotal += totalVal;
                }
            });

            var subtotalEl = group.querySelector('.service-subtotal');
            if (subtotalEl) {
                subtotalEl.textContent = 'SubTotal ' + subtotal.toFixed(2) + ' / CLU';
            }
            if (typeof syncSharedLabCatalogFromCotizacion === 'function') {
                syncSharedLabCatalogFromCotizacion();
            }
            // Actualizar resumen en cabecera
            if (typeof updateHeaderServicesSummary === 'function') {
                updateHeaderServicesSummary();
            }
        }

        function resolveLabMainRow(row) {
            return row || null;
        }

        function findLabControl(mainRow, selector) {
            return mainRow ? mainRow.querySelector(selector) : null;
        }

        function resolveLabServiceCodeByName(serviceName) {
            var name = (serviceName || '').toString().trim().toLowerCase();
            if (!name) return '';
            var cards = Array.from(document.querySelectorAll('#modalBuscarServicios .service-card[data-context="lab"]'));
            for (var i = 0; i < cards.length; i++) {
                var card = cards[i];
                var cardName = ((card.getAttribute('data-servicio') || '').toString().trim().toLowerCase());
                if (cardName === name) {
                    var codeEl = card.querySelector('.service-card-code');
                    var code = codeEl ? codeEl.textContent.trim() : '';
                    if (!code) {
                        code = (card.getAttribute('data-etfa-code') || '').toString().trim();
                    }
                    return code;
                }
            }
            var hash = 0;
            for (var j = 0; j < name.length; j++) {
                hash = (hash * 31 + name.charCodeAt(j)) % 90000000;
            }
            return String(10000000 + hash);
        }

        function ensureLabSecondaryRow(mainRow, laboratorio, tiempo, etfaChecked) {
            var row = resolveLabMainRow(mainRow);
            if (!row) return null;
            var labOptions = ['Santiago', 'Antofagasta'];
            var selectedLab = labOptions.indexOf(laboratorio) !== -1 ? laboratorio : 'Santiago';
            var responseTime = (tiempo || '12').toString();
            var isEtfa = !!etfaChecked;
            var cells = row.querySelectorAll('td');
            if (cells.length < 12) return null;

            // Laboratorio y Tresp juntos después de LD; ETFA en acciones
            var labCell = cells[3];
            var timeCell = cells[4];
            var actionCell = cells[cells.length - 1];

            row.querySelectorAll('.lab-inline-lab, .lab-inline-time, .lab-inline-etfa, .lab-etfa-action').forEach(function(el) {
                el.remove();
            });

            if (labCell) {
                var labHtml =
                    '<div class="lab-inline-cell lab-inline-lab">' +
                        '<select class="lab-cell-input lab-cell-select lab-cell-lab lab-edit-control js-lab-laboratorio" disabled>' +
                            labOptions.map(function(opt) {
                                var selected = opt === selectedLab ? ' selected' : '';
                                return '<option value="' + opt.replace(/"/g, '&quot;') + '"' + selected + '>' + opt + '</option>';
                            }).join('') +
                        '</select>' +
                    '</div>';
                labCell.innerHTML = labHtml;
            }

            if (timeCell) {
                var timeHtml =
                    '<div class="lab-inline-cell lab-inline-time">' +
                        '<input type="number" min="0" step="1" value="' + responseTime + '" class="lab-cell-input lab-cell-tiempo lab-edit-control js-lab-tiempo" disabled>' +
                    '</div>';
                timeCell.innerHTML = timeHtml;
            }

            if (actionCell) {
                var rowCodeEl = row.querySelector('.lab-service-code strong');
                var etfaCodeText = rowCodeEl ? rowCodeEl.textContent.trim() : '';
                var etfaHtml =
                    '<label class="lab-etfa-inline lab-etfa-action' + (isEtfa ? ' is-checked' : '') + '">' +
                        '<span class="lab-etfa-status">' +
                            '<i class="fas fa-check-circle"></i>' +
                            '<span class="lab-etfa-code">' + (etfaCodeText || '') + '</span>' +
                        '</span>' +
                        '<input type="checkbox" class="js-lab-etfa" ' + (isEtfa ? 'checked ' : '') + 'disabled>' +
                    '</label>';
                var firstIcon = actionCell.querySelector('i');
                if (firstIcon) {
                    firstIcon.insertAdjacentHTML('beforebegin', etfaHtml);
                } else {
                    actionCell.insertAdjacentHTML('beforeend', etfaHtml);
                }
            }
            return row;
        }

        function syncLabRowComputedValues(row) {
            var mainRow = resolveLabMainRow(row);
            if (!mainRow) return;
            var cells = mainRow.querySelectorAll('td');
            if (cells.length < 11) return;

            var precio = parseFloat((cells[6].textContent || '0').replace(',', '.')) || 0;
            var tipoSelect = findLabControl(mainRow, '.js-lab-tipo');
            var variacionInput = findLabControl(mainRow, '.js-lab-variacion');
            var cantidadInput = findLabControl(mainRow, '.js-lab-cantidad');
            var tipo = tipoSelect ? tipoSelect.value : (cells[7].textContent || 'PORCENTAJE').trim();
            var variacion = variacionInput ? parseFloat((variacionInput.value || '0').replace(',', '.')) || 0 : (parseFloat((cells[8].textContent || '0').replace(',', '.')) || 0);
            var cantidad = cantidadInput ? parseFloat((cantidadInput.value || '1').replace(',', '.')) || 1 : (parseFloat((cells[9].textContent || '1').replace(',', '.')) || 1);
            var precioFinal = tipo === 'PORCENTAJE'
                ? (precio + (precio * variacion / 100))
                : (precio + variacion);
            var total = precioFinal * cantidad;

            cells[10].textContent = total.toFixed(2);
        }

        function decorateLabServiceRow(row) {
            var mainRow = resolveLabMainRow(row);
            if (!mainRow) {
                return;
            }
            mainRow.classList.add('lab-main-row');

            var cells = mainRow.querySelectorAll('td');
            if (cells.length < 10) {
                return;
            }

            var hasOldColumns = cells.length >= 13;
            var indexText = (cells[0] ? cells[0].textContent.trim() : '1') || '1';
            var existingLab = mainRow.querySelector('.js-lab-laboratorio');
            var existingTime = mainRow.querySelector('.js-lab-tiempo');
            var existingEtfa = mainRow.querySelector('.js-lab-etfa');
            var currentLabControl = findLabControl(mainRow, '.js-lab-laboratorio');
            var currentTimeControl = findLabControl(mainRow, '.js-lab-tiempo');
            var currentEtfaControl = findLabControl(mainRow, '.js-lab-etfa');

            var serviceName = '';
            var serviceCode = '';
            var serviceMethod = '';
            var ld = '';
            var unidad = '';
            var precio = 0;
            var tipo = 'PORCENTAJE';
            var variacion = 0;
            var cantidad = 1;
            var total = 0;
            var laboratorio = 'Santiago';
            var tiempo = '12';
            var etfaChecked = false;

            if (hasOldColumns) {
                serviceName = (cells[1] ? cells[1].textContent.trim() : '');
                serviceMethod = (cells[3] ? cells[3].textContent.trim() : '');
                serviceCode = resolveLabServiceCodeByName(serviceName);
                ld = (cells[2] ? cells[2].textContent.trim() : '');
                unidad = (cells[4] ? cells[4].textContent.trim() : '');
                precio = parseFloat((cells[5] ? cells[5].textContent : '0').replace(',', '.')) || 0;
                tipo = (cells[6] ? cells[6].textContent.trim() : 'PORCENTAJE') || 'PORCENTAJE';
                variacion = parseFloat((cells[7] ? cells[7].textContent : '0').replace(',', '.')) || 0;
                cantidad = parseFloat((cells[8] ? cells[8].textContent : '1').replace(',', '.')) || 1;
                total = parseFloat((cells[9] ? cells[9].textContent : '0').replace(',', '.')) || 0;
                laboratorio = (cells[10] ? cells[10].textContent.trim() : 'Santiago') || 'Santiago';
                laboratorio = laboratorio.replace(/^Lab\.\s*/i, '').replace(/\s*-\s*ENV$/i, '').trim() || 'Santiago';
                tiempo = (cells[11] ? cells[11].textContent.trim() : '12') || '12';
                etfaChecked = !!mainRow.querySelector('td:nth-child(13) input[type="checkbox"]:checked');
            } else {
                var nameEl = mainRow.querySelector('.lab-service-name');
                var codeEl = mainRow.querySelector('.lab-service-code strong');
                var methodEl = mainRow.querySelector('.lab-service-method');
                serviceName = nameEl ? nameEl.textContent.trim() : (cells[1] ? cells[1].textContent.trim() : '');
                serviceCode = codeEl ? codeEl.textContent.trim() : resolveLabServiceCodeByName(serviceName);
                serviceMethod = methodEl ? methodEl.textContent.trim() : '';
                ld = (cells[2] ? cells[2].textContent.trim() : '');
                unidad = (cells[5] ? cells[5].textContent.trim() : '');
                precio = parseFloat((cells[6] ? cells[6].textContent : '0').replace(',', '.')) || 0;
                var tipoSel = mainRow.querySelector('.js-lab-tipo');
                tipo = tipoSel ? tipoSel.value : ((cells[7] ? cells[7].textContent.trim() : 'PORCENTAJE') || 'PORCENTAJE');
                var varInput = mainRow.querySelector('.js-lab-variacion');
                variacion = varInput ? (parseFloat((varInput.value || '0').replace(',', '.')) || 0) : (parseFloat((cells[8] ? cells[8].textContent : '0').replace(',', '.')) || 0);
                var cantInput = mainRow.querySelector('.js-lab-cantidad');
                cantidad = cantInput ? (parseFloat((cantInput.value || '1').replace(',', '.')) || 1) : (parseFloat((cells[9] ? cells[9].textContent : '1').replace(',', '.')) || 1);
                total = parseFloat((cells[10] ? cells[10].textContent : '0').replace(',', '.')) || 0;
                laboratorio = ((existingLab && existingLab.value) || (currentLabControl && currentLabControl.value) || 'Santiago');
                tiempo = ((existingTime && existingTime.value) || (currentTimeControl && currentTimeControl.value) || '12');
                etfaChecked = !!((existingEtfa && existingEtfa.checked) || (currentEtfaControl && currentEtfaControl.checked));
            }

            mainRow.innerHTML =
                '<td class="text-center">' + indexText + '</td>' +
                '<td><span class="lab-service-name">' + serviceName + '</span><span class="lab-service-code"><strong>' + (serviceCode || '') + '</strong>' +
                    (serviceMethod ? '<span class="lab-service-separator"> / </span><span class="lab-service-method">' + serviceMethod + '</span>' : '') +
                '</span></td>' +
                '<td>' + ld + '</td>' +
                '<td></td>' +
                '<td></td>' +
                '<td>' + unidad + '</td>' +
                '<td align="right">' + precio.toFixed(2) + '</td>' +
                '<td><select class="lab-cell-input lab-cell-select lab-edit-control js-lab-tipo" disabled>' +
                    '<option value="PORCENTAJE"' + (tipo === 'PORCENTAJE' ? ' selected' : '') + '>Porcentaje</option>' +
                    '<option value="FIJO"' + (tipo === 'FIJO' ? ' selected' : '') + '>Fijo</option>' +
                '</select></td>' +
                '<td align="right"><input type="number" min="0" step="0.01" value="' + variacion.toFixed(2) + '" class="lab-cell-input lab-edit-control js-lab-variacion" disabled></td>' +
                '<td align="right"><input type="number" min="1" step="1" value="' + cantidad.toFixed(2) + '" class="lab-cell-input lab-edit-control js-lab-cantidad" disabled></td>' +
                '<td align="right">' + total.toFixed(2) + '</td>' +
                '<td style="width:110px"><i class="fas fa-edit lab-edit-row" title="Editar"></i> <i class="fas fa-times lab-cancel-row" title="Cancelar edición"></i> <i class="fas fa-trash" title="Eliminar"></i></td>';

            cells = mainRow.querySelectorAll('td');
            ensureLabSecondaryRow(mainRow, laboratorio, tiempo, etfaChecked);

            var editIcon = mainRow.querySelector('i.fa-edit');
            if (editIcon) {
                editIcon.classList.add('lab-edit-row');
                editIcon.title = mainRow.classList.contains('is-editing') ? 'Guardar cambios' : 'Editar';
            }

            var actionCell = cells[cells.length - 1];
            if (actionCell && !actionCell.querySelector('.lab-cancel-row')) {
                var trashIcon = actionCell.querySelector('i.fa-trash');
                var cancelIcon = document.createElement('i');
                cancelIcon.className = 'fas fa-times lab-cancel-row';
                cancelIcon.title = 'Cancelar edición';
                if (trashIcon) {
                    actionCell.insertBefore(cancelIcon, trashIcon);
                } else {
                    actionCell.appendChild(cancelIcon);
                }
            }
        }

        function decorateAllLabServiceRows() {
            document.querySelectorAll('#divGruposServicioLab .service-group tbody tr').forEach(function(row) {
                if (row.classList.contains('empty-row')) return;
                decorateLabServiceRow(row);
            });
        }

        function getLabRowSnapshot(row) {
            var mainRow = resolveLabMainRow(row);
            return {
                tipo: findLabControl(mainRow, '.js-lab-tipo') ? findLabControl(mainRow, '.js-lab-tipo').value : 'PORCENTAJE',
                variacion: findLabControl(mainRow, '.js-lab-variacion') ? findLabControl(mainRow, '.js-lab-variacion').value : '0.00',
                cantidad: findLabControl(mainRow, '.js-lab-cantidad') ? findLabControl(mainRow, '.js-lab-cantidad').value : '1.00',
                laboratorio: findLabControl(mainRow, '.js-lab-laboratorio') ? findLabControl(mainRow, '.js-lab-laboratorio').value : 'Santiago',
                tiempo: findLabControl(mainRow, '.js-lab-tiempo') ? findLabControl(mainRow, '.js-lab-tiempo').value : '12',
                etfa: !!(findLabControl(mainRow, '.js-lab-etfa') && findLabControl(mainRow, '.js-lab-etfa').checked)
            };
        }

        function applyLabRowSnapshot(row, snapshot) {
            var mainRow = resolveLabMainRow(row);
            if (!mainRow || !snapshot) return;
            var tipo = findLabControl(mainRow, '.js-lab-tipo');
            var variacion = findLabControl(mainRow, '.js-lab-variacion');
            var cantidad = findLabControl(mainRow, '.js-lab-cantidad');
            var laboratorio = findLabControl(mainRow, '.js-lab-laboratorio');
            var tiempo = findLabControl(mainRow, '.js-lab-tiempo');
            var etfa = findLabControl(mainRow, '.js-lab-etfa');

            if (tipo) tipo.value = snapshot.tipo;
            if (variacion) variacion.value = snapshot.variacion;
            if (cantidad) cantidad.value = snapshot.cantidad;
            if (laboratorio) laboratorio.value = snapshot.laboratorio;
            if (tiempo) tiempo.value = snapshot.tiempo;
            if (etfa) etfa.checked = snapshot.etfa;
        }

        function setLabRowEditingState(row, isEditing) {
            var mainRow = resolveLabMainRow(row);
            if (!mainRow) return;
            mainRow.classList.toggle('is-editing', isEditing);
            mainRow.querySelectorAll('.lab-edit-control').forEach(function(input) {
                input.disabled = !isEditing;
            });
            mainRow.querySelectorAll('.js-lab-etfa').forEach(function(input) {
                input.disabled = !isEditing;
            });

            var editIcon = mainRow.querySelector('.lab-edit-row');
            if (editIcon) {
                editIcon.classList.toggle('fa-save', isEditing);
                editIcon.classList.toggle('fa-edit', !isEditing);
                editIcon.title = isEditing ? 'Guardar cambios' : 'Editar';
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
                var totalCell = row.querySelector('.js-muestreo-total');
                var precio = precioCell ? parseFloat(precioCell.textContent.replace(',', '.')) || 0 : 0;
                var variacion = variacionInput ? parseFloat(variacionInput.value.replace(',', '.')) || 0 : 0;
                var cantidad = cantidadInput ? parseFloat(cantidadInput.value.replace(',', '.')) || 0 : 0;
                var tipo = tipoSelect ? tipoSelect.value : 'FIJO';
                var precioFinal = tipo === 'PORCENTAJE'
                    ? (precio + (precio * variacion / 100))
                    : (precio + variacion);
                var total = precioFinal * cantidad;
                if (totalCell) {
                    totalCell.textContent = total.toFixed(2);
                }
            });
            var subtotalEl = container.querySelector('.service-subtotal');
            if (subtotalEl) {
                var subtotal = rows.reduce(function(sum, row) {
                    var totalCell = row.querySelectorAll('td')[7];
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
            var emptyRow = tbody.querySelector('tr.empty-row td[colspan]');
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
                var codeEl = card.querySelector('.service-card-code');
                var serviceCode = codeEl ? codeEl.textContent.trim() : '';
                if (!serviceCode) {
                    var etfaCode = card.getAttribute('data-etfa-code') || '';
                    serviceCode = etfaCode || '00000000';
                }

                var precioNum = parseFloat(precio.replace(',', '.')) || 0;

                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td class="text-center">' + (currentCount + idx + 1) + '</td>' +
                    '<td><span class="lab-service-name">' + name + '</span><span class="lab-service-code"><strong>' + serviceCode + '</strong><span class="lab-service-separator"> / </span><span class="lab-service-method">' + metodo + '</span></span></td>' +
                    '<td>' + ld + '</td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td>' + unidad + '</td>' +
                    '<td align="right">' + precioNum.toFixed(2) + '</td>' +
                    '<td><select class="lab-cell-input lab-cell-select lab-edit-control js-lab-tipo" disabled><option value="PORCENTAJE" selected>Porcentaje</option><option value="FIJO">Fijo</option></select></td>' +
                    '<td align="right"><input type="number" min="0" step="0.01" value="0.00" class="lab-cell-input lab-edit-control js-lab-variacion" disabled></td>' +
                    '<td align="right"><input type="number" min="1" step="1" value="1.00" class="lab-cell-input lab-edit-control js-lab-cantidad" disabled></td>' +
                    '<td align="right">' + precioNum.toFixed(2) + '</td>' +
                    '<td style="width:110px"><i class="fas fa-edit lab-edit-row" title="Editar"></i> <i class="fas fa-times lab-cancel-row" title="Cancelar edición"></i> <i class="fas fa-trash" title="Eliminar"></i></td>';
                tr.classList.add('lab-main-row');
                decorateLabServiceRow(tr);

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
                var budgetMeta = [productoVal, presentacionVal].filter(function(value) { return !!value; }).join(' / ');
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
                        '<div class="muestreo-budget-meta">' + (budgetMeta || '-') + '</div>' +
                    '</td>' +
                    '<td>' + unidad + '</td>' +
                    '<td align="right">' + precio + '</td>' +
                    '<td><select class="muestreo-cell-input js-muestreo-tipo" disabled><option value="FIJO"' + (tipoVar === 'FIJO' ? ' selected' : '') + '>FIJO</option><option value="PORCENTAJE"' + (tipoVar === 'PORCENTAJE' ? ' selected' : '') + '>PORCENTAJE</option></select></td>' +
                    '<td align="right"><input type="number" min="0" step="0.01" value="' + variacion + '" class="muestreo-cell-input js-muestreo-variacion" disabled></td>' +
                    '<td align="right"><input type="number" min="1" step="1" value="' + cantidad + '" class="muestreo-cell-input js-muestreo-cantidad" disabled></td>' +
                    '<td align="right" class="js-muestreo-total">' + total + '</td>' +
                    '<td class="text-center"><div class="service-row-actions"><i class="fas fa-edit muestreo-edit-row"></i><i class="fas fa-trash"></i><i class="fas fa-grip-vertical service-row-drag" title="Arrastrar para reordenar" draggable="true"></i></div></td>';

                tbody.appendChild(tr);
            });

            var subtotalEl = container.querySelector('.service-subtotal');
            updateMuestreoRowsAndSubtotal();
            refreshSortableServiceRows('divDetalleServicioMuestreo');

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
                var budgetMeta = [productoVal, presentacionVal].filter(function(value) { return !!value; }).join(' / ');
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
                        '<div class="muestreo-budget-meta">' + (budgetMeta || '-') + '</div>' +
                    '</td>' +
                    '<td>' + unidad + '</td>' +
                    '<td align="right">' + precioNum.toFixed(2) + '</td>' +
                    '<td><select class="muestreo-cell-input js-otros-tipo" disabled><option value="FIJO"' + (tipoVar === 'FIJO' ? ' selected' : '') + '>FIJO</option><option value="PORCENTAJE"' + (tipoVar === 'PORCENTAJE' ? ' selected' : '') + '>PORCENTAJE</option></select></td>' +
                    '<td align="right"><input type="number" min="0" step="0.01" value="' + variacion + '" class="muestreo-cell-input js-otros-variacion" disabled></td>' +
                    '<td align="right"><input type="number" min="1" step="1" value="' + cantidad + '" class="muestreo-cell-input js-otros-cantidad" disabled></td>' +
                    '<td align="right" class="js-otros-total">' + total.toFixed(2) + '</td>' +
                    '<td class="text-center"><div class="service-row-actions"><i class="fas fa-edit otros-edit-row"></i><i class="fas fa-trash"></i><i class="fas fa-grip-vertical service-row-drag" title="Arrastrar para reordenar" draggable="true"></i></div></td>';

                tbody.appendChild(tr);
            });

            updateOtrosRowsAndSubtotal();
            refreshSortableServiceRows('divDetalleServicioMon');

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
                var totalCell = row.querySelector('.js-otros-total');
                var precio = precioCell ? parseFloat(precioCell.textContent.replace(',', '.')) || 0 : 0;
                var variacion = variacionInput ? parseFloat(variacionInput.value.replace(',', '.')) || 0 : 0;
                var cantidad = cantidadInput ? parseFloat(cantidadInput.value.replace(',', '.')) || 0 : 0;
                var tipo = tipoSelect ? tipoSelect.value : 'FIJO';
                var precioFinal = tipo === 'PORCENTAJE'
                    ? (precio + (precio * variacion / 100))
                    : (precio + variacion);
                var total = precioFinal * cantidad;
                if (totalCell) {
                    totalCell.textContent = total.toFixed(2);
                }
            });

            var subtotalEl = container.querySelector('.service-subtotal');
            if (subtotalEl) {
                var subtotal = rows.reduce(function(sum, row) {
                    var totalCell = row.querySelectorAll('td')[7];
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
                            '<i class="fas fa-grip-vertical group-drag-handle" title="Arrastrar grupo para reordenar" draggable="true"></i>' +
                            'Grupo ' + grupoIndex + ': ' + safeName +
                        '</div>' +
                        '<div class="group-actions">' +
                            '<i class="fas fa-arrow-up" title="Subir grupo"></i>' +
                            '<i class="fas fa-arrow-down" title="Bajar grupo"></i>' +
                            '<i class="fas fa-pen"></i>' +
                            '<i class="fas fa-trash"></i>' +
                            '<button class="btn btn-success btn-sm js-open-service-modal" data-context="lab"><i class="fas fa-plus"></i> Servicio</button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="service-tags">' + (tagsHtml || '<span class="service-tag">Sin producto</span>') + '</div>' +
                    '<div class="table-responsive" style="padding: 10px 12px;">' +
                        '<table class="table table-lct">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th>#</th><th>Servicio</th><th>LD*</th><th>Laboratorio</th><th>T. Resp.</th><th>Unidad</th><th>Precio Unit.</th>' +
                                    '<th>Tipo Var.</th><th>Variación</th><th>Cant</th><th>Total</th><th></th>' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody>' +
                                '<tr class="empty-row"><td colspan="12" style="text-align:center;color:#9a9a9a;">Sin servicios en este grupo.</td></tr>' +
                            '</tbody>' +
                        '</table>' +
                    '</div>' +
                    '<div class="service-subtotal">SubTotal 0.00 / CLU</div>' +
                '</div>';

            document.getElementById('divGruposServicioLab').insertAdjacentHTML('beforeend', grupoHtml);
            renumberGroups();
            refreshLabGroupDragHandles();
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
                    titleEl.innerHTML = '<i class="fas fa-grip-vertical group-drag-handle" title="Arrastrar grupo para reordenar" draggable="true"></i>Grupo ' + (idx + 1) + ': ' + name;
                }
            });
        }

        function moveLabGroup(group, direction) {
            var container = document.getElementById('divGruposServicioLab');
            if (!container || !group) {
                return;
            }

            if (direction === 'up' && group.previousElementSibling) {
                container.insertBefore(group, group.previousElementSibling);
            } else if (direction === 'down' && group.nextElementSibling) {
                container.insertBefore(group.nextElementSibling, group);
            } else {
                return;
            }

            renumberGroups();
            updateHeaderServicesSummary();
        }

        function refreshSortableServiceRows(containerId) {
            var container = document.getElementById(containerId);
            if (!container) {
                return;
            }

            container.querySelectorAll('tbody tr').forEach(function(row) {
                row.classList.add('sortable-service-row');
                var handle = row.querySelector('.service-row-drag');
                if (handle) {
                    handle.setAttribute('draggable', 'true');
                    handle.setAttribute('title', 'Arrastrar para reordenar');
                }
            });
        }

        function clearSortableServiceState(tbody) {
            if (tbody) {
                tbody.querySelectorAll('tr').forEach(function(row) {
                    row.classList.remove('drag-target-before', 'drag-target-after', 'is-dragging');
                });
            }
            serviceDropTargetRow = null;
            serviceDropInsertAfter = false;
        }

        function getSortableServiceDropTarget(tbody, clientY) {
            var rows = Array.from(tbody.querySelectorAll('tr:not(.is-dragging)'));

            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var rect = row.getBoundingClientRect();
                if (clientY < rect.top + rect.height / 2) {
                    return {
                        element: row,
                        insertAfter: false
                    };
                }

                if (clientY < rect.bottom) {
                    return {
                        element: row,
                        insertAfter: true
                    };
                }
            }

            return {
                element: rows.length ? rows[rows.length - 1] : null,
                insertAfter: true
            };
        }

        function initSortableServiceTable(containerId, renumberFn) {
            var container = document.getElementById(containerId);
            if (!container) {
                return;
            }

            var tbody = container.querySelector('tbody');
            if (!tbody) {
                return;
            }

            refreshSortableServiceRows(containerId);

            if (tbody.dataset.sortReady === 'true') {
                return;
            }

            tbody.dataset.sortReady = 'true';

            tbody.addEventListener('dragstart', function(e) {
                var handle = e.target.closest('.service-row-drag');
                if (!handle) {
                    e.preventDefault();
                    return;
                }

                var row = handle.closest('tr');
                if (!row) {
                    e.preventDefault();
                    return;
                }

                draggedServiceRow = row;
                draggedServiceRow.classList.add('is-dragging');

                if (e.dataTransfer) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', 'service-row');
                }
            });

            tbody.addEventListener('dragover', function(e) {
                if (!draggedServiceRow) {
                    return;
                }

                e.preventDefault();
                clearSortableServiceState(tbody);
                draggedServiceRow.classList.add('is-dragging');

                var targetData = getSortableServiceDropTarget(tbody, e.clientY);
                if (targetData.element) {
                    serviceDropTargetRow = targetData.element;
                    serviceDropInsertAfter = targetData.insertAfter;
                    targetData.element.classList.add(targetData.insertAfter ? 'drag-target-after' : 'drag-target-before');
                }
            });

            tbody.addEventListener('drop', function(e) {
                if (!draggedServiceRow) {
                    return;
                }

                e.preventDefault();

                if (serviceDropTargetRow && serviceDropTargetRow !== draggedServiceRow) {
                    if (serviceDropInsertAfter) {
                        tbody.insertBefore(draggedServiceRow, serviceDropTargetRow.nextElementSibling);
                    } else {
                        tbody.insertBefore(draggedServiceRow, serviceDropTargetRow);
                    }
                } else if (!serviceDropTargetRow) {
                    tbody.appendChild(draggedServiceRow);
                }
            });

            tbody.addEventListener('dragend', function() {
                if (!draggedServiceRow) {
                    clearSortableServiceState(tbody);
                    return;
                }

                draggedServiceRow.classList.remove('is-dragging');
                draggedServiceRow = null;
                clearSortableServiceState(tbody);
                refreshSortableServiceRows(containerId);
                renumberFn();
            });
        }

        function refreshLabGroupDragHandles() {
            document.querySelectorAll('#divGruposServicioLab .service-group .group-drag-handle').forEach(function(handleEl) {
                handleEl.setAttribute('draggable', 'true');
                handleEl.setAttribute('title', 'Arrastrar grupo para reordenar');
            });
        }

        function clearLabGroupDropState() {
            document.querySelectorAll('#divGruposServicioLab .service-group').forEach(function(group) {
                group.classList.remove('drag-target-before', 'drag-target-after', 'is-dragging');
            });
            labDropTarget = null;
            labDropInsertAfter = false;
        }

        function getLabGroupDropTarget(container, clientY) {
            var groups = Array.from(container.querySelectorAll('.service-group:not(.is-dragging)'));

            for (var i = 0; i < groups.length; i++) {
                var group = groups[i];
                var rect = group.getBoundingClientRect();
                if (clientY < rect.top + rect.height / 2) {
                    return {
                        element: group,
                        insertAfter: false
                    };
                }

                if (clientY < rect.bottom) {
                    return {
                        element: group,
                        insertAfter: true
                    };
                }
            }

            return {
                element: groups.length ? groups[groups.length - 1] : null,
                insertAfter: true
            };
        }

        function initLabGroupDragAndDrop() {
            var container = document.getElementById('divGruposServicioLab');
            if (!container || container.dataset.dragReady === 'true') {
                refreshLabGroupDragHandles();
                return;
            }

            container.dataset.dragReady = 'true';
            refreshLabGroupDragHandles();

            container.addEventListener('dragstart', function(e) {
                var handle = e.target.closest('.group-drag-handle');
                if (!handle) {
                    e.preventDefault();
                    return;
                }

                draggedLabGroup = handle.closest('.service-group');
                if (!draggedLabGroup) {
                    e.preventDefault();
                    return;
                }

                draggedLabGroup.classList.add('is-dragging');
                if (e.dataTransfer) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', draggedLabGroup.dataset.groupName || '');
                }
            });

            container.addEventListener('dragover', function(e) {
                if (!draggedLabGroup) {
                    return;
                }

                e.preventDefault();
                clearLabGroupDropState();
                draggedLabGroup.classList.add('is-dragging');

                var targetData = getLabGroupDropTarget(container, e.clientY);
                if (targetData.element) {
                    labDropTarget = targetData.element;
                    labDropInsertAfter = targetData.insertAfter;
                    targetData.element.classList.add(targetData.insertAfter ? 'drag-target-after' : 'drag-target-before');
                }
            });

            container.addEventListener('drop', function(e) {
                if (!draggedLabGroup) {
                    return;
                }

                e.preventDefault();

                if (labDropTarget && labDropTarget !== draggedLabGroup) {
                    if (labDropInsertAfter) {
                        container.insertBefore(draggedLabGroup, labDropTarget.nextElementSibling);
                    } else {
                        container.insertBefore(draggedLabGroup, labDropTarget);
                    }
                } else if (!labDropTarget) {
                    container.appendChild(draggedLabGroup);
                }
            });

            container.addEventListener('dragend', function() {
                if (!draggedLabGroup) {
                    clearLabGroupDropState();
                    return;
                }

                draggedLabGroup.classList.remove('is-dragging');
                draggedLabGroup = null;
                clearLabGroupDropState();
                renumberGroups();
                updateHeaderServicesSummary();
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

            var btnVerResumenServicios = document.getElementById('btnVerResumenServicios');
            if (btnVerResumenServicios) {
                btnVerResumenServicios.addEventListener('click', openBlankSummaryPopup);
            }
            ensureSummaryDrawerReady();
            var summaryDrawer = document.getElementById('summaryDrawer');
            if (summaryDrawer) {
                summaryDrawer.addEventListener('click', function(e) {
                    if (e.target === summaryDrawer) {
                        closeBlankSummaryPopup();
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
            document.getElementById('btnCancelarGrupoNuevo').addEventListener('click', closeNuevoGrupoModal);
            document.getElementById('btnGuardarGrupoNuevo').addEventListener('click', addGrupoServicio);

            var btnLabAgregarMenu = document.getElementById('btnLabAgregarMenu');
            var labAddActionsDropdown = document.getElementById('labAddActionsDropdown');
            if (btnLabAgregarMenu && labAddActionsDropdown) {
                btnLabAgregarMenu.addEventListener('click', function(e) {
                    e.stopPropagation();
                    labAddActionsDropdown.classList.toggle('open');
                });
                document.addEventListener('click', function(ev) {
                    if (!labAddActionsDropdown.contains(ev.target)) {
                        labAddActionsDropdown.classList.remove('open');
                    }
                });
                labAddActionsDropdown.querySelectorAll('.service-actions-item').forEach(function(itemBtn) {
                    itemBtn.addEventListener('click', function() {
                        labAddActionsDropdown.classList.remove('open');
                    });
                });
            }

            initSortableServiceTable('divDetalleServicioMuestreo', updateMuestreoRowsAndSubtotal);
            initSortableServiceTable('divDetalleServicioMon', updateOtrosRowsAndSubtotal);

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
            decorateAllLabServiceRows();
            document.querySelectorAll('#divGruposServicioLab .service-group').forEach(function(group) {
                updateGroupRowsAndSubtotal(group);
            });
            initLabGroupDragAndDrop();
            document.getElementById('divGruposServicioLab').addEventListener('click', function(e) {
                var serviceBtn = e.target.closest('.js-open-service-modal');
                if (serviceBtn) {
                    var context = serviceBtn.getAttribute('data-context') || 'lab';
                    currentServiceGroup = context === 'lab' ? serviceBtn.closest('.service-group') : null;
                    openBuscarServiciosModal(context);
                    return;
                }

                var rowAction = e.target.closest('i.fa-edit, i.fa-save, i.fa-times, i.fa-trash');
                if (rowAction && !rowAction.closest('.group-actions')) {
                    var row = resolveLabMainRow(rowAction.closest('tr'));
                    var group = rowAction.closest('.service-group');
                    if (row && group) {
                        if (rowAction.classList.contains('lab-edit-row')) {
                            if (row.classList.contains('is-editing')) {
                                // Guardar cambios
                                setLabRowEditingState(row, false);
                                syncLabRowComputedValues(row);
                                updateGroupRowsAndSubtotal(group);
                                delete row.dataset.labSnapshot;
                            } else {
                                // Entrar en edición con snapshot para posible cancelación
                                row.dataset.labSnapshot = JSON.stringify(getLabRowSnapshot(row));
                                setLabRowEditingState(row, true);
                            }
                        } else if (rowAction.classList.contains('lab-cancel-row')) {
                            var snapshot = null;
                            if (row.dataset.labSnapshot) {
                                try {
                                    snapshot = JSON.parse(row.dataset.labSnapshot);
                                } catch (err) {
                                    snapshot = null;
                                }
                            }
                            applyLabRowSnapshot(row, snapshot);
                            setLabRowEditingState(row, false);
                            syncLabRowComputedValues(row);
                            updateGroupRowsAndSubtotal(group);
                            delete row.dataset.labSnapshot;
                        } else {
                            row.remove();
                            updateGroupRowsAndSubtotal(group);
                        }
                    }
                    return;
                }

                if (e.target.classList.contains('fa-arrow-up') && e.target.closest('.group-actions')) {
                    moveLabGroup(e.target.closest('.service-group'), 'up');
                    return;
                }

                if (e.target.classList.contains('fa-arrow-down') && e.target.closest('.group-actions')) {
                    moveLabGroup(e.target.closest('.service-group'), 'down');
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

            document.getElementById('divGruposServicioLab').addEventListener('input', function(e) {
                if (e.target.classList.contains('js-lab-variacion') || e.target.classList.contains('js-lab-cantidad') || e.target.classList.contains('js-lab-tiempo')) {
                    var row = resolveLabMainRow(e.target.closest('tr'));
                    var group = e.target.closest('.service-group');
                    if (row) {
                        syncLabRowComputedValues(row);
                    }
                    if (group) {
                        updateGroupRowsAndSubtotal(group);
                    }
                }
            });

            document.getElementById('divGruposServicioLab').addEventListener('change', function(e) {
                if (e.target.classList.contains('js-lab-tipo') || e.target.classList.contains('js-lab-laboratorio')) {
                    var row = resolveLabMainRow(e.target.closest('tr'));
                    var group = e.target.closest('.service-group');
                    if (row) {
                        syncLabRowComputedValues(row);
                    }
                    if (group) {
                        updateGroupRowsAndSubtotal(group);
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
                            refreshSortableServiceRows('divDetalleServicioMuestreo');
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
                            refreshSortableServiceRows('divDetalleServicioMon');
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
                    closeBlankSummaryPopup();
                }
            });

            // Initialize summary updates
            initializeSummaryUpdates();

            // Inicializar barra demo en paso 1
            applyDemoStep(1);
            applyPrefillFromUrl();
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
                syncApprovalPanelsByQuoteStatus();
            }
        }

        // Update propuesta badge
        function updateSummaryProposal(propuesta) {
            var badgeEl = document.getElementById('summaryProposalBadge');
            var numberEl = document.getElementById('summaryProposalNumber');
            if (!badgeEl || !numberEl) {
                return;
            }
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
                var rows = group.querySelectorAll('tbody tr.lab-main-row:not(.empty-row)');
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

                    // Obtener producto/presentación desde tags o texto compacto
                    var tags = [];
                    var tagsContainer = row.querySelector('.service-tags');
                    if (tagsContainer) {
                        tagsContainer.querySelectorAll('.service-tag').forEach(function(tag) {
                            tags.push(tag.textContent.trim());
                        });
                    }
                    if (!tags.length) {
                        var budgetMetaEl = row.querySelector('.muestreo-budget-meta');
                        if (budgetMetaEl) {
                            tags = budgetMetaEl.textContent.split('/').map(function(part) {
                                return part.trim();
                            }).filter(function(part) { return !!part; });
                        }
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

                    // Obtener producto/presentación desde tags o texto compacto
                    var tags = [];
                    var tagsContainer = row.querySelector('.service-tags');
                    if (tagsContainer) {
                        tagsContainer.querySelectorAll('.service-tag').forEach(function(tag) {
                            tags.push(tag.textContent.trim());
                        });
                    }
                    if (!tags.length) {
                        var budgetMetaEl = row.querySelector('.muestreo-budget-meta');
                        if (budgetMetaEl) {
                            tags = budgetMetaEl.textContent.split('/').map(function(part) {
                                return part.trim();
                            }).filter(function(part) { return !!part; });
                        }
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
                    var metaText = (service.tags || []).filter(function(tag) { return !!tag; }).join(' /  ');

                    html += '<tr>';
                    html += '<td>' + (index + 1) + '</td>';

                    if (service.type === 'lab-group') {
                        // Grupo de laboratorio: nombre + cantidad + producto/presentación en segunda línea
                        // Precio unitario = total del grupo, cantidad = 1, descuento = 0
                        html += '<td><div class="service-name-inline">';
                        html += '<div class="summary-service-main">';
                        html += '<i class="fas ' + service.icon + '"></i>';
                        html += '<span>' + service.name + '</span>';
                        html += '<span class="summary-service-count">' + service.serviceCount + ' servicios</span>';
                        html += '</div>';
                        if (metaText) {
                            html += '<div class="summary-service-meta">' + metaText + '</div>';
                        }
                        html += '</div></td>';
                        html += '<td>' + formatNumber(service.total) + '</td>';
                        html += '<td>1</td>';
                        html += '<td>0.00</td>';
                    } else {
                        // Servicio individual: nombre + producto/presentación en segunda línea
                        html += '<td><div class="service-name-inline">';
                        html += '<div class="summary-service-main">';
                        html += '<i class="fas ' + service.icon + '"></i>';
                        html += '<span>' + service.name + '</span>';
                        html += '</div>';
                        if (metaText) {
                            html += '<div class="summary-service-meta">' + metaText + '</div>';
                        }
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
            var drawerTotalEl = document.getElementById('summaryServicesTotal');

            if (grandTotalEl) {
                grandTotalEl.textContent = formatNumber(grandTotal);
            }
            if (grandCurrencyEl) {
                grandCurrencyEl.textContent = '/' + currency;
            }
            if (drawerTotalEl) {
                drawerTotalEl.textContent = formatNumber(grandTotal) + ' /' + currency;
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
            initExternalNotificationRegister();
            renderApprovalWorkflowUI();
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

        var pdfHideCosts = false;
        var pdfTemplateMode = 'consolidada';
        var approvalWorkflow = {
            role: 'requester',
            status: 'none',
            lastRequest: null,
            log: []
        };

        function getSummaryStatusText() {
            var statusEl = document.getElementById('summaryStatus');
            if (!statusEl) return '';
            var span = statusEl.querySelector('span');
            return ((span && span.textContent) || statusEl.textContent || '').trim();
        }

        function getCurrentQuoteNumberValue() {
            var numberEl = document.getElementById('summaryQuoteNumber');
            if (!numberEl) return '';
            return (numberEl.textContent || '').replace('#', '').trim();
        }

        function setQuoteSummaryStatus(statusText) {
            var number = getCurrentQuoteNumberValue();
            if (!number) return;
            updateSummaryQuoteNumber(number, statusText);
        }

        function syncApprovalPanelsByQuoteStatus() {
            var requestCard = document.getElementById('approvalRequestCard');
            var reviewCard = document.getElementById('approvalReviewCard');
            var status = getSummaryStatusText().toLowerCase();
            if (!requestCard || !reviewCard) return;

            if (status.indexOf('registrado') !== -1) {
                requestCard.style.display = '';
                reviewCard.style.display = 'none';
                return;
            }
            if (
                status.indexOf('pendiente de aprobación') !== -1 ||
                status.indexOf('pendiente aprobacion') !== -1 ||
                status.indexOf('pendiente de autorización') !== -1 ||
                status.indexOf('pendiente de autorizacion') !== -1 ||
                status.indexOf('aprobado') !== -1 ||
                status.indexOf('autorizada') !== -1
            ) {
                requestCard.style.display = 'none';
                reviewCard.style.display = '';
                return;
            }
            requestCard.style.display = 'none';
            reviewCard.style.display = 'none';
        }

        function syncStep5NextButtonLabel() {
            var btn = document.getElementById('step5NextBtn');
            if (!btn) return;
            btn.innerHTML = 'Siguiente <i class="fas fa-arrow-right"></i>';
        }

        function getCurrentUserName() {
            var userEl = document.getElementById('NombreUsuarioSistema');
            return userEl ? (userEl.textContent || '').trim() || 'Usuario' : 'Usuario';
        }

        function formatApprovalDateTime(dateObj) {
            return ('0' + dateObj.getDate()).slice(-2) + '/' +
                ('0' + (dateObj.getMonth() + 1)).slice(-2) + '/' +
                dateObj.getFullYear() + ' ' +
                ('0' + dateObj.getHours()).slice(-2) + ':' +
                ('0' + dateObj.getMinutes()).slice(-2);
        }

        function renderApprovalWorkflowUI() {
            var infoEl = document.getElementById('approvalLastRequestInfo');
            var approveBtn = document.getElementById('approvalApproveBtn');
            var logBody = document.getElementById('approvalLogBody');
            var reviewActionsBlock = document.getElementById('approvalReviewActionsBlock');

            if (infoEl) {
                if (approvalWorkflow.lastRequest) {
                    infoEl.textContent = 'Solicitó: ' + approvalWorkflow.lastRequest.user + ' | Fecha: ' + approvalWorkflow.lastRequest.date +
                        ' | Comentario: ' + approvalWorkflow.lastRequest.comment;
                } else {
                    infoEl.textContent = 'Aún no hay solicitudes registradas.';
                }
            }

            if (approveBtn) {
                approveBtn.disabled = !(approvalWorkflow.status === 'requested');
            }

            if (reviewActionsBlock) {
                reviewActionsBlock.style.display = approvalWorkflow.status === 'approved' ? 'none' : '';
            }

            if (logBody) {
                if (!approvalWorkflow.log.length) {
                    logBody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#9a9a9a;">Sin eventos</td></tr>';
                } else {
                    logBody.innerHTML = approvalWorkflow.log.map(function(item) {
                        return '<tr>' +
                            '<td>' + item.date + '</td>' +
                            '<td>' + item.action + '</td>' +
                            '<td>' + item.user + '</td>' +
                            '<td>' + item.comment + '</td>' +
                        '</tr>';
                    }).join('');
                }
            }
            syncApprovalPanelsByQuoteStatus();
            syncStep5NextButtonLabel();
        }

        function getPdfTemplateLabel(mode) {
            if (mode === 'tecnica') return 'Propuesta Técnica';
            if (mode === 'economica') return 'Propuesta Económica';
            return 'Propuesta Consolidada';
        }

        function applyPdfCostsVisibilityUI() {
            var container = document.getElementById('pdfPreviewContainer');
            var badge = document.getElementById('pdfCostsHiddenBadge');
            var toggleBtn = document.getElementById('togglePdfCostsBtn');
            var toggleText = document.getElementById('togglePdfCostsText');
            var templateBadge = document.getElementById('pdfTemplateBadge');
            var templateSelect = document.getElementById('pdfTemplateSelect');
            if (container) container.classList.remove('hide-costs');
            if (badge) badge.textContent = pdfHideCosts ? 'Vista sin costos' : 'Vista con costos';
            if (templateBadge) templateBadge.textContent = 'Plantilla: ' + getPdfTemplateLabel(pdfTemplateMode);
            if (templateSelect && templateSelect.value !== pdfTemplateMode) templateSelect.value = pdfTemplateMode;
            if (toggleText) toggleText.textContent = pdfHideCosts ? 'Mostrar costos' : 'Ocultar costos';
            if (toggleBtn) {
                toggleBtn.title = pdfHideCosts ? 'Mostrar costos en la previsualización' : 'Ocultar costos en la previsualización';
                var icon = toggleBtn.querySelector('i');
                if (icon) icon.className = pdfHideCosts ? 'fas fa-eye' : 'fas fa-eye-slash';
            }
        }

        function buildPdfPreviewUrl() {
            var params = [];
            if (pdfHideCosts) params.push('hide_costs=1');
            params.push('template=' + encodeURIComponent(pdfTemplateMode));
            params.push('t=' + Date.now());
            return 'descarga.pdf?' + params.join('&');
        }

        function togglePdfCostsVisibility() {
            pdfHideCosts = !pdfHideCosts;
            applyPdfCostsVisibilityUI();
            refreshPdfPreview();
        }

        function changePdfTemplate(value) {
            var next = (value || '').toLowerCase();
            if (next !== 'tecnica' && next !== 'economica' && next !== 'consolidada') {
                next = 'consolidada';
            }
            pdfTemplateMode = next;
            applyPdfCostsVisibilityUI();
            refreshPdfPreview();
        }

        function refreshPdfPreview() {
            var container = document.getElementById('pdfPreviewContainer');
            var frame = document.getElementById('pdfPreviewFrame');
            if (!container || !frame) return;
            applyPdfCostsVisibilityUI();

            // Mostrar loading overlay
            var overlay = document.createElement('div');
            overlay.className = 'pdf-loading-overlay';
            overlay.innerHTML = '<div class="spinner"></div><span>Generando PDF...</span>';
            container.appendChild(overlay);

            // Simular regeneración
            setTimeout(function() {
                frame.src = buildPdfPreviewUrl();
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

        function requestQuoteApproval() {
            var commentEl = document.getElementById('approvalRequestComment');
            var statusEl = document.getElementById('approvalRequestStatus');
            var btnEl = document.getElementById('approvalRequestBtn');
            if (!commentEl || !statusEl || !btnEl) return;

            var comment = (commentEl.value || '').trim();
            if (!comment) {
                commentEl.focus();
                return;
            }

            var now = new Date();
            var dateStr = formatApprovalDateTime(now);
            var user = getCurrentUserName();

            statusEl.style.display = '';
            statusEl.textContent = 'Solicitud enviada el ' + dateStr + '.';
            btnEl.disabled = true;
            btnEl.textContent = 'Solicitado';

            approvalWorkflow.status = 'requested';
            approvalWorkflow.lastRequest = { user: user, date: dateStr, comment: comment };
            approvalWorkflow.log.unshift({
                date: dateStr,
                action: 'Solicitud',
                user: user,
                comment: comment
            });
            setQuoteSummaryStatus('Pendiente de autorización');
            renderApprovalWorkflowUI();
        }

        function onApprovalRoleChange(value) {
            approvalWorkflow.role = value === 'approver' ? 'approver' : 'requester';
            renderApprovalWorkflowUI();
        }

        function openApprovalConfirmModal() {
            var modal = document.getElementById('approvalConfirmModal');
            if (!modal) return;
            modal.style.display = 'flex';
        }

        function closeApprovalConfirmModal() {
            var modal = document.getElementById('approvalConfirmModal');
            if (!modal) return;
            modal.style.display = 'none';
        }

        function approveQuoteRequest() {
            if (approvalWorkflow.status !== 'requested') return;
            var commentEl = document.getElementById('approvalDecisionComment');
            var comment = ((commentEl && commentEl.value) || '').trim();
            if (!comment) {
                if (commentEl) commentEl.focus();
                return;
            }
            openApprovalConfirmModal();
        }

        function confirmApproveQuoteRequest() {
            if (approvalWorkflow.status !== 'requested') return;
            var commentEl = document.getElementById('approvalDecisionComment');
            var statusEl = document.getElementById('approvalDecisionStatus');
            var comment = ((commentEl && commentEl.value) || '').trim();
            if (!comment) {
                closeApprovalConfirmModal();
                if (commentEl) commentEl.focus();
                return;
            }

            var now = new Date();
            var dateStr = formatApprovalDateTime(now);
            var user = getCurrentUserName();

            approvalWorkflow.status = 'approved';
            approvalWorkflow.log.unshift({
                date: dateStr,
                action: 'Autorización',
                user: user,
                comment: comment
            });
            setQuoteSummaryStatus('Autorizada');
            if (statusEl) {
                statusEl.style.display = '';
                statusEl.textContent = 'Autorización registrada el ' + dateStr + '.';
            }
            closeApprovalConfirmModal();
            renderApprovalWorkflowUI();
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
        var lastNotificationRecord = null;
        var externalNotificationFile = null;

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

        function toggleExternalNotifForm(show) {
            var form = document.getElementById('notifExternalForm');
            if (!form) return;
            form.style.display = show ? '' : 'none';
        }

        function initExternalNotificationRegister() {
            var selectBtn = document.getElementById('notifExternalSelectFileBtn');
            var fileInput = document.getElementById('notifExternalFileInput');
            var fileNameEl = document.getElementById('notifExternalFileName');
            var dateEl = document.getElementById('notifExternalDate');
            if (dateEl && !dateEl.value) {
                var now = new Date();
                dateEl.value = now.getFullYear() + '-' +
                    ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
                    ('0' + now.getDate()).slice(-2) + 'T' +
                    ('0' + now.getHours()).slice(-2) + ':' +
                    ('0' + now.getMinutes()).slice(-2);
            }
            if (selectBtn && fileInput) {
                selectBtn.addEventListener('click', function() {
                    fileInput.click();
                });
                fileInput.addEventListener('change', function() {
                    externalNotificationFile = (fileInput.files && fileInput.files[0]) ? fileInput.files[0] : null;
                    if (fileNameEl) fileNameEl.textContent = externalNotificationFile ? externalNotificationFile.name : 'Sin archivo';
                });
            }
        }

        function registerExternalNotification() {
            var dateEl = document.getElementById('notifExternalDate');
            var fileInput = document.getElementById('notifExternalFileInput');
            var fileNameEl = document.getElementById('notifExternalFileName');
            var rawDate = dateEl ? dateEl.value : '';
            if (!rawDate) {
                if (dateEl) dateEl.focus();
                return;
            }
            if (!externalNotificationFile) {
                if (fileInput) fileInput.focus();
                return;
            }

            var userName = getCurrentUserName();
            var d = new Date(rawDate);
            var dateStr = ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear() + ' ' +
                ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);

            lastNotificationRecord = {
                fechaEnvio: dateStr,
                usuario: userName,
                email: 'Registro externo',
                respaldo: externalNotificationFile.name,
                isExternal: true
            };

            if (fileInput) fileInput.value = '';
            externalNotificationFile = null;
            if (fileNameEl) fileNameEl.textContent = 'Sin archivo';
            toggleExternalNotifForm(false);
            showNotifSent();
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
                    var userEl = document.getElementById('NombreUsuarioSistema');
                    var userName = userEl ? userEl.textContent.trim() : 'Usuario';
                    var emailText = '';
                    if (lastSentEmail && lastSentEmail.para) {
                        var emailMatch = lastSentEmail.para.match(/<([^>]+)>/);
                        emailText = emailMatch ? emailMatch[1] : lastSentEmail.para;
                    }
                    lastNotificationRecord = {
                        fechaEnvio: lastSentEmail ? lastSentEmail.fechaEnvio : '',
                        usuario: userName,
                        email: emailText || '--',
                        respaldo: '--',
                        isExternal: false
                    };
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
            var extForm = document.getElementById('notifExternalForm');
            if (pending) pending.style.display = 'none';
            if (sent) sent.style.display = 'flex';
            if (extForm) extForm.style.display = 'none';

            var fechaEl = document.getElementById('Estado_Notificacion_Fecha');
            var userNotifEl = document.getElementById('Estado_Notificacion_Usuario');
            var emailEl = document.getElementById('Estado_Notificacion_Email');
            var respaldoEl = document.getElementById('Estado_Notificacion_Respaldo');
            var viewBtn = document.getElementById('notifViewEmailBtn');
            var resendBtn = document.getElementById('notifResendBtn');
            var rec = lastNotificationRecord;
            if (!rec && lastSentEmail) {
                var userEl = document.getElementById('NombreUsuarioSistema');
                var userName = userEl ? userEl.textContent.trim() : 'Usuario';
                var emailMatch = lastSentEmail.para ? lastSentEmail.para.match(/<([^>]+)>/) : null;
                rec = {
                    fechaEnvio: lastSentEmail.fechaEnvio,
                    usuario: userName,
                    email: emailMatch ? emailMatch[1] : (lastSentEmail.para || '--'),
                    respaldo: '--',
                    isExternal: false
                };
            }
            if (fechaEl) fechaEl.textContent = rec ? (rec.fechaEnvio || '--') : '--';
            if (userNotifEl) userNotifEl.textContent = rec ? (rec.usuario || '--') : '--';
            if (emailEl) emailEl.textContent = rec ? (rec.email || '--') : '--';
            if (respaldoEl) respaldoEl.textContent = rec ? (rec.respaldo || '--') : '--';
            if (viewBtn) viewBtn.style.display = rec && rec.isExternal ? 'none' : '';
            if (resendBtn) resendBtn.style.display = '';
        }

        function openFinalizeStep6Modal() {
            var modal = document.getElementById('finalizeStep6Modal');
            if (!modal) return;
            modal.style.display = 'flex';
        }

        function closeFinalizeStep6Modal() {
            var modal = document.getElementById('finalizeStep6Modal');
            if (!modal) return;
            modal.style.display = 'none';
        }

        function confirmFinalizeStep6() {
            closeFinalizeStep6Modal();
            setQuoteSummaryStatus('Aprobada');
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
            lastNotificationRecord = null;
            externalNotificationFile = null;
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
            var extForm = document.getElementById('notifExternalForm');
            if (pending) pending.style.display = '';
            if (sent) sent.style.display = 'none';
            if (extForm) extForm.style.display = 'none';
            var extDate = document.getElementById('notifExternalDate');
            if (extDate) extDate.value = '';
            var extFile = document.getElementById('notifExternalFileInput');
            if (extFile) extFile.value = '';
            var extFileName = document.getElementById('notifExternalFileName');
            if (extFileName) extFileName.textContent = 'Sin archivo';

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
            applyPdfCostsVisibilityUI();
            if (frame) frame.src = buildPdfPreviewUrl();
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
            metodologias_fq: ['Protocolo de muestreo', 'Parámetros a Analizar y Laboratorios', 'Parámetros medidos in situ'],
            metodologias_bio: ['Protocolo de muestreo'],
            metodologias_fis: ['Resumen', 'Contenido']
        };

        var techDrafts = {};
        var activeTechId = '';
        var activeMetFQSubsection = '';
        var activeMetFQMatrixId = '';
        var activeMetBioSubsection = '';
        var activeMetBioMatrixId = '';
        var metFQMatrixOptions = [
            { value: 'AGUA_MAR_E', label: 'Agua de Mar (E)' },
            { value: 'AGUA_INDUSTRIAL_G', label: 'Agua para fines industriales (G)' },
            { value: 'AGUA_RESIDUAL_F', label: 'Agua Residual (F)' },
            { value: 'AGUA_SUPERFICIAL_D', label: 'Agua Superficial (D)' },
            { value: 'BIOTAS_U', label: 'Biotas (U)' },
            { value: 'SED_ACUATICOS_SUB', label: 'Sedimentos Acuáticos Submareales' },
            { value: 'SED_ACUATICOS_INTER', label: 'Sedimentos Acuáticos Intermareales' },
            { value: 'SED_MARINOS_SUB', label: 'Sedimentos Marinos Submareales' },
            { value: 'SED_MARINOS_INTER', label: 'Sedimentos Marinos Intermareales' }
        ];
        var preloadedMetFQMatrices = ['AGUA_MAR_E', 'AGUA_RESIDUAL_F'];
        var metBioMatrixOptions = [
            { value: 'FITOPLANCTON', label: 'Fitoplancton' },
            { value: 'ZOOPLANCTON', label: 'Zooplancton' },
            { value: 'ICTIOPLANCTON', label: 'Ictioplancton' },
            { value: 'MACROBENTONICA_SUB', label: 'Macrobentónica Submareal de Sustrato Blando' },
            { value: 'MACROBENTONICA_INTER', label: 'Macrobentónica Intermareal de Sustrato Blando' },
            { value: 'CENSO_AVES_MAM_REP', label: 'Censo Aves, Mamíferos Marinos y Reptiles' },
            { value: 'BANCOS_NAT_RH', label: 'Bancos Naturales de Recursos Hidrobiológicos' },
            { value: 'ICTIOFAUNA_LITORAL', label: 'Ictiofauna Litoral' },
            { value: 'EPI_SUB_DURO', label: 'Epibentónica Submareal de Sustrato Duro' },
            { value: 'EPI_INTER_DURO', label: 'Epibentónica Intermareal de Sustrato Duro' },
            { value: 'FILMACIONES_ROV', label: 'Filmaciones ROV' }
        ];
        var preloadedMetBioMatrices = ['FITOPLANCTON', 'ZOOPLANCTON'];
        var metBioClassicMatrices = ['FITOPLANCTON', 'ZOOPLANCTON', 'ICTIOPLANCTON', 'MACROBENTONICA_SUB', 'MACROBENTONICA_INTER', 'CENSO_AVES_MAM_REP'];
        var metBioTransectasMatrices = ['CENSO_AVES_MAM_REP', 'BANCOS_NAT_RH', 'ICTIOFAUNA_LITORAL', 'EPI_SUB_DURO', 'EPI_INTER_DURO', 'MACROBENTONICA_INTER', 'FILMACIONES_ROV'];
        var metBioEspecificacionesMatrices = ['CENSO_AVES_MAM_REP', 'FITOPLANCTON', 'ZOOPLANCTON'];

        function getMetFQMatrixLabel(value) {
            var found = metFQMatrixOptions.find(function(opt) { return opt.value === value; });
            return found ? found.label : value;
        }

        function getMetBioMatrixLabel(value) {
            var found = metBioMatrixOptions.find(function(opt) { return opt.value === value; });
            return found ? found.label : value;
        }

        function getActiveMetFQMatrixValue() {
            var draft = techDrafts.metodologias_fq || {};
            var group = (draft.matrix_groups || []).find(function(g) { return g.id === activeMetFQMatrixId; });
            return group ? group.matriz : 'AGUA_MAR_E';
        }

        function getActiveMetBioMatrixValue() {
            var draft = techDrafts.metodologias_bio || {};
            var group = (draft.matrix_groups || []).find(function(g) { return g.id === activeMetBioMatrixId; });
            return group ? group.matriz : 'FITOPLANCTON';
        }

        function getMetBioSubsectionsForMatrix(matrixValue) {
            var subs = [];
            if (metBioClassicMatrices.indexOf(matrixValue) !== -1) {
                subs.push({ id: 'protocolo_estudio', title: 'Protocolo de muestreo' });
            }
            if (metBioTransectasMatrices.indexOf(matrixValue) !== -1) {
                subs.push({ id: 'protocolo_transectas', title: 'Protocolo de muestreo Transectas' });
            }
            if (metBioEspecificacionesMatrices.indexOf(matrixValue) !== -1) {
                subs.push({ id: 'especificaciones', title: 'Especificaciones' });
            }
            return subs;
        }

        function buildEmptyMetFQGroup(id, matriz) {
            return {
                id: id,
                matriz: matriz,
                protocolo_intro: '',
                protocolo_puntos: [],
                protocolo_imagen: '',
                protocolo_imagen_name: '',
                protocolo_descripcion: '',
                selectedParams: [],
                params_intro: '',
                texto_final: '',
                in_situ_intro: '',
                in_situ_selected: [],
                in_situ_final: '',
                updatedAt: ''
            };
        }

        function buildMetFQGroupFromRoot(id, matriz, draft) {
            return {
                id: id,
                matriz: matriz,
                protocolo_intro: draft.protocolo_intro || '',
                protocolo_puntos: Array.isArray(draft.protocolo_puntos) ? JSON.parse(JSON.stringify(draft.protocolo_puntos)) : [],
                protocolo_imagen: draft.protocolo_imagen || '',
                protocolo_imagen_name: draft.protocolo_imagen_name || '',
                protocolo_descripcion: draft.protocolo_descripcion || '',
                selectedParams: Array.isArray(draft.selectedParams) ? JSON.parse(JSON.stringify(draft.selectedParams)) : [],
                params_intro: draft.params_intro || '',
                texto_final: draft.texto_final || '',
                in_situ_intro: draft.in_situ_intro || '',
                in_situ_selected: Array.isArray(draft.in_situ_selected) ? JSON.parse(JSON.stringify(draft.in_situ_selected)) : [],
                in_situ_final: draft.in_situ_final || '',
                updatedAt: draft.updatedAt || ''
            };
        }

        function applyMetFQGroupToRoot(group, draft) {
            if (!group || !draft) return;
            draft.protocolo_intro = group.protocolo_intro || '';
            draft.protocolo_puntos = Array.isArray(group.protocolo_puntos) ? JSON.parse(JSON.stringify(group.protocolo_puntos)) : [];
            draft.protocolo_imagen = group.protocolo_imagen || '';
            draft.protocolo_imagen_name = group.protocolo_imagen_name || '';
            draft.protocolo_descripcion = group.protocolo_descripcion || '';
            draft.selectedParams = Array.isArray(group.selectedParams) ? JSON.parse(JSON.stringify(group.selectedParams)) : [];
            draft.params_intro = group.params_intro || '';
            draft.texto_final = group.texto_final || '';
            draft.in_situ_intro = group.in_situ_intro || '';
            draft.in_situ_selected = Array.isArray(group.in_situ_selected) ? JSON.parse(JSON.stringify(group.in_situ_selected)) : [];
            draft.in_situ_final = group.in_situ_final || '';
            draft.updatedAt = group.updatedAt || draft.updatedAt || '';
        }

        function syncRootToActiveMetFQGroup() {
            var draft = techDrafts.metodologias_fq;
            if (!draft || !Array.isArray(draft.matrix_groups) || !draft.matrix_groups.length) return;
            var active = draft.matrix_groups.find(function(g) { return g.id === activeMetFQMatrixId; }) || draft.matrix_groups[0];
            if (!active) return;
            var snap = buildMetFQGroupFromRoot(active.id, active.matriz, draft);
            Object.assign(active, snap);
            draft.active_matrix_id = active.id;
        }

        function ensureMetFQMatrixGroups() {
            var draft = techDrafts.metodologias_fq;
            if (!draft) return;
            if (!Array.isArray(draft.matrix_groups)) draft.matrix_groups = [];

            preloadedMetFQMatrices.forEach(function(matrixValue) {
                var existing = draft.matrix_groups.find(function(g) { return g && g.matriz === matrixValue; });
                if (!existing) {
                    draft.matrix_groups.push(buildEmptyMetFQGroup('matrix_' + matrixValue, matrixValue));
                }
            });

            if (!draft.active_matrix_id || !draft.matrix_groups.some(function(g) { return g.id === draft.active_matrix_id; })) {
                draft.active_matrix_id = draft.matrix_groups[0].id;
            }

            activeMetFQMatrixId = draft.active_matrix_id;
            var activeGroup = draft.matrix_groups.find(function(g) { return g.id === activeMetFQMatrixId; }) || draft.matrix_groups[0];
            if (activeGroup) {
                applyMetFQGroupToRoot(activeGroup, draft);
            }
        }

        function renderMetFQMatrixGroups() {
            if (activeTechId !== 'metodologias_fq') return;
            ensureMetFQMatrixGroups();
            var draft = techDrafts.metodologias_fq;
            if (!draft) return;

            var chipsEl = document.getElementById('techMetFQMatrixChips');
            var selectEl = document.getElementById('techMetFQMatrixSelect');
            if (selectEl) {
                var activeGroup = (draft.matrix_groups || []).find(function(g) { return g.id === activeMetFQMatrixId; });
                selectEl.value = activeGroup ? activeGroup.matriz : 'AGUA_MAR_E';
            }
            if (!chipsEl) return;
            var lockedByStep2 = getLockedMetFQMatricesFromStep2();
            chipsEl.innerHTML = (draft.matrix_groups || []).map(function(group) {
                var activeCls = group.id === activeMetFQMatrixId ? ' active' : '';
                var removable = !lockedByStep2[group.matriz];
                return '<button type="button" class="tech-metfq-chip' + activeCls + '" data-metfq-group-id="' + group.id + '">' +
                    '<span class="chip-label">' + getMetFQMatrixLabel(group.matriz) + '</span>' +
                    (removable ? '<span class="chip-remove" data-metfq-remove-group-id="' + group.id + '" title="Quitar matriz">&times;</span>' : '') +
                '</button>';
            }).join('');

            chipsEl.querySelectorAll('button[data-metfq-group-id]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var groupId = this.getAttribute('data-metfq-group-id');
                    if (!groupId || groupId === activeMetFQMatrixId) return;
                    syncActiveDraft(true);
                    ensureMetFQMatrixGroups();
                    var draftNow = techDrafts.metodologias_fq;
                    var group = (draftNow.matrix_groups || []).find(function(g) { return g.id === groupId; });
                    if (!group) return;
                    activeMetFQMatrixId = group.id;
                    activeMetFQSubsection = '';
                    draftNow.active_matrix_id = group.id;
                    applyMetFQGroupToRoot(group, draftNow);
                    buildTechTree();
                    selectTechItem('metodologias_fq', { skipSyncCurrent: true });
                });
            });
            chipsEl.querySelectorAll('[data-metfq-remove-group-id]').forEach(function(removeBtn) {
                removeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var groupId = this.getAttribute('data-metfq-remove-group-id');
                    if (!groupId) return;
                    syncActiveDraft(true);
                    ensureMetFQMatrixGroups();
                    var draftNow = techDrafts.metodologias_fq;
                    var index = (draftNow.matrix_groups || []).findIndex(function(g) { return g.id === groupId; });
                    if (index === -1) return;
                    var target = draftNow.matrix_groups[index];
                    var lockedNow = getLockedMetFQMatricesFromStep2();
                    if (lockedNow[target.matriz]) return;
                    draftNow.matrix_groups.splice(index, 1);
                    if (!draftNow.matrix_groups.length) {
                        ensureMetFQMatrixGroups();
                    }
                    var fallback = draftNow.matrix_groups[0];
                    if (groupId === activeMetFQMatrixId && fallback) {
                        activeMetFQMatrixId = fallback.id;
                        activeMetFQSubsection = '';
                        draftNow.active_matrix_id = fallback.id;
                        applyMetFQGroupToRoot(fallback, draftNow);
                    } else if (fallback && !draftNow.matrix_groups.some(function(g) { return g.id === draftNow.active_matrix_id; })) {
                        draftNow.active_matrix_id = fallback.id;
                    }
                    draftNow.dirty = true;
                    updateTechStatus('Cambios sin guardar');
                    buildTechTree();
                    selectTechItem('metodologias_fq', { skipSyncCurrent: true });
                });
            });
        }

        function buildEmptyMetBioGroup(id, matriz) {
            return {
                id: id,
                matriz: matriz,
                protocolo_intro: '',
                protocolo_puntos: [],
                protocolo_imagen: '',
                protocolo_imagen_name: '',
                protocolo_descripcion: '',
                transectas_intro: '',
                transectas_puntos: [],
                transectas_imagen: '',
                transectas_imagen_name: '',
                transectas_descripcion: '',
                especificaciones_texto: '',
                especificaciones_descripcion: '',
                fitoplancton_cualitativo: false,
                fitoplancton_cuantitativo: false,
                zoo_ictio_vertical_diurno: false,
                zoo_ictio_vertical_nocturno: false,
                zoo_ictio_horizontal_diurno: false,
                zoo_ictio_horizontal_nocturno: false,
                censo_mar_diurno: false,
                censo_mar_nocturno: false,
                censo_tierra_diurno: false,
                censo_tierra_nocturno: false,
                updatedAt: ''
            };
        }

        function buildMetBioGroupFromRoot(id, matriz, draft) {
            return {
                id: id,
                matriz: matriz,
                protocolo_intro: draft.protocolo_intro || '',
                protocolo_puntos: Array.isArray(draft.protocolo_puntos) ? JSON.parse(JSON.stringify(draft.protocolo_puntos)) : [],
                protocolo_imagen: draft.protocolo_imagen || '',
                protocolo_imagen_name: draft.protocolo_imagen_name || '',
                protocolo_descripcion: draft.protocolo_descripcion || '',
                transectas_intro: draft.transectas_intro || '',
                transectas_puntos: Array.isArray(draft.transectas_puntos) ? JSON.parse(JSON.stringify(draft.transectas_puntos)) : [],
                transectas_imagen: draft.transectas_imagen || '',
                transectas_imagen_name: draft.transectas_imagen_name || '',
                transectas_descripcion: draft.transectas_descripcion || '',
                especificaciones_texto: draft.especificaciones_texto || '',
                especificaciones_descripcion: draft.especificaciones_descripcion || '',
                fitoplancton_cualitativo: !!draft.fitoplancton_cualitativo,
                fitoplancton_cuantitativo: !!draft.fitoplancton_cuantitativo,
                zoo_ictio_vertical_diurno: !!draft.zoo_ictio_vertical_diurno,
                zoo_ictio_vertical_nocturno: !!draft.zoo_ictio_vertical_nocturno,
                zoo_ictio_horizontal_diurno: !!draft.zoo_ictio_horizontal_diurno,
                zoo_ictio_horizontal_nocturno: !!draft.zoo_ictio_horizontal_nocturno,
                censo_mar_diurno: !!draft.censo_mar_diurno,
                censo_mar_nocturno: !!draft.censo_mar_nocturno,
                censo_tierra_diurno: !!draft.censo_tierra_diurno,
                censo_tierra_nocturno: !!draft.censo_tierra_nocturno,
                updatedAt: draft.updatedAt || ''
            };
        }

        function applyMetBioGroupToRoot(group, draft) {
            if (!group || !draft) return;
            draft.protocolo_intro = group.protocolo_intro || '';
            draft.protocolo_puntos = Array.isArray(group.protocolo_puntos) ? JSON.parse(JSON.stringify(group.protocolo_puntos)) : [];
            draft.protocolo_imagen = group.protocolo_imagen || '';
            draft.protocolo_imagen_name = group.protocolo_imagen_name || '';
            draft.protocolo_descripcion = group.protocolo_descripcion || '';
            draft.transectas_intro = group.transectas_intro || '';
            draft.transectas_puntos = Array.isArray(group.transectas_puntos) ? JSON.parse(JSON.stringify(group.transectas_puntos)) : [];
            draft.transectas_imagen = group.transectas_imagen || '';
            draft.transectas_imagen_name = group.transectas_imagen_name || '';
            draft.transectas_descripcion = group.transectas_descripcion || '';
            draft.especificaciones_texto = group.especificaciones_texto || '';
            draft.especificaciones_descripcion = group.especificaciones_descripcion || '';
            draft.fitoplancton_cualitativo = !!group.fitoplancton_cualitativo;
            draft.fitoplancton_cuantitativo = !!group.fitoplancton_cuantitativo;
            draft.zoo_ictio_vertical_diurno = !!group.zoo_ictio_vertical_diurno;
            draft.zoo_ictio_vertical_nocturno = !!group.zoo_ictio_vertical_nocturno;
            draft.zoo_ictio_horizontal_diurno = !!group.zoo_ictio_horizontal_diurno;
            draft.zoo_ictio_horizontal_nocturno = !!group.zoo_ictio_horizontal_nocturno;
            draft.censo_mar_diurno = !!group.censo_mar_diurno;
            draft.censo_mar_nocturno = !!group.censo_mar_nocturno;
            draft.censo_tierra_diurno = !!group.censo_tierra_diurno;
            draft.censo_tierra_nocturno = !!group.censo_tierra_nocturno;
            draft.updatedAt = group.updatedAt || draft.updatedAt || '';
        }

        function syncRootToActiveMetBioGroup() {
            var draft = techDrafts.metodologias_bio;
            if (!draft || !Array.isArray(draft.matrix_groups) || !draft.matrix_groups.length) return;
            var active = draft.matrix_groups.find(function(g) { return g.id === activeMetBioMatrixId; }) || draft.matrix_groups[0];
            if (!active) return;
            var snap = buildMetBioGroupFromRoot(active.id, active.matriz, draft);
            Object.assign(active, snap);
            draft.active_matrix_id = active.id;
        }

        function ensureMetBioMatrixGroups() {
            var draft = techDrafts.metodologias_bio;
            if (!draft) return;
            if (!Array.isArray(draft.matrix_groups)) draft.matrix_groups = [];

            if (draft.matrix_groups.length === 0 && !draft._matrix_seeded) {
                preloadedMetBioMatrices.forEach(function(matrixValue) {
                    var existing = draft.matrix_groups.find(function(g) { return g && g.matriz === matrixValue; });
                    if (!existing) {
                        draft.matrix_groups.push(buildEmptyMetBioGroup('matrix_bio_' + matrixValue, matrixValue));
                    }
                });
                draft._matrix_seeded = true;
            }

            if (draft.matrix_groups.length === 0) {
                draft.active_matrix_id = '';
                activeMetBioMatrixId = '';
                return;
            }

            if (!draft.active_matrix_id || !draft.matrix_groups.some(function(g) { return g.id === draft.active_matrix_id; })) {
                draft.active_matrix_id = draft.matrix_groups[0].id;
            }

            activeMetBioMatrixId = draft.active_matrix_id;
            var activeGroup = draft.matrix_groups.find(function(g) { return g.id === activeMetBioMatrixId; }) || draft.matrix_groups[0];
            if (activeGroup) {
                applyMetBioGroupToRoot(activeGroup, draft);
            }
        }

        function renderMetBioMatrixGroups() {
            if (activeTechId !== 'metodologias_bio') return;
            ensureMetBioMatrixGroups();
            var draft = techDrafts.metodologias_bio;
            if (!draft) return;

            var chipsEl = document.getElementById('techMetBioMatrixChips');
            var selectEl = document.getElementById('techMetBioMatrixSelect');
            if (selectEl) {
                var activeGroup = (draft.matrix_groups || []).find(function(g) { return g.id === activeMetBioMatrixId; });
                selectEl.value = activeGroup ? activeGroup.matriz : 'FITOPLANCTON';
            }
            if (!chipsEl) return;
            chipsEl.innerHTML = (draft.matrix_groups || []).map(function(group) {
                var activeCls = group.id === activeMetBioMatrixId ? ' active' : '';
                return '<button type="button" class="tech-metfq-chip' + activeCls + '" data-metbio-group-id="' + group.id + '">' +
                    '<span class="chip-label">' + getMetBioMatrixLabel(group.matriz) + '</span>' +
                    '<span class="chip-remove" data-metbio-remove-group-id="' + group.id + '" title="Quitar matriz">&times;</span>' +
                '</button>';
            }).join('');

            chipsEl.querySelectorAll('button[data-metbio-group-id]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var groupId = this.getAttribute('data-metbio-group-id');
                    if (!groupId || groupId === activeMetBioMatrixId) return;
                    syncActiveDraft(true);
                    ensureMetBioMatrixGroups();
                    var draftNow = techDrafts.metodologias_bio;
                    var group = (draftNow.matrix_groups || []).find(function(g) { return g.id === groupId; });
                    if (!group) return;
                    activeMetBioMatrixId = group.id;
                    activeMetBioSubsection = '';
                    draftNow.active_matrix_id = group.id;
                    applyMetBioGroupToRoot(group, draftNow);
                    buildTechTree();
                    selectTechItem('metodologias_bio', { skipSyncCurrent: true });
                });
            });
            chipsEl.querySelectorAll('[data-metbio-remove-group-id]').forEach(function(removeBtn) {
                removeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var groupId = this.getAttribute('data-metbio-remove-group-id');
                    if (!groupId) return;
                    syncActiveDraft(true);
                    ensureMetBioMatrixGroups();
                    var draftNow = techDrafts.metodologias_bio;
                    var index = (draftNow.matrix_groups || []).findIndex(function(g) { return g.id === groupId; });
                    if (index === -1) return;
                    draftNow.matrix_groups.splice(index, 1);
                    if (!draftNow.matrix_groups.length) {
                        activeMetBioMatrixId = '';
                        activeMetBioSubsection = '';
                        draftNow.active_matrix_id = '';
                        draftNow.protocolo_intro = '';
                        draftNow.protocolo_puntos = [];
                        draftNow.protocolo_imagen = '';
                        draftNow.protocolo_imagen_name = '';
                        draftNow.protocolo_descripcion = '';
                        draftNow.transectas_intro = '';
                        draftNow.transectas_puntos = [];
                        draftNow.transectas_imagen = '';
                        draftNow.transectas_imagen_name = '';
                        draftNow.transectas_descripcion = '';
                        draftNow.especificaciones_texto = '';
                        draftNow.especificaciones_descripcion = '';
                        draftNow.fitoplancton_cualitativo = false;
                        draftNow.fitoplancton_cuantitativo = false;
                        draftNow.zoo_ictio_vertical_diurno = false;
                        draftNow.zoo_ictio_vertical_nocturno = false;
                        draftNow.zoo_ictio_horizontal_diurno = false;
                        draftNow.zoo_ictio_horizontal_nocturno = false;
                        draftNow.censo_mar_diurno = false;
                        draftNow.censo_mar_nocturno = false;
                        draftNow.censo_tierra_diurno = false;
                        draftNow.censo_tierra_nocturno = false;
                    }
                    var fallback = draftNow.matrix_groups[0];
                    if (groupId === activeMetBioMatrixId && fallback) {
                        activeMetBioMatrixId = fallback.id;
                        activeMetBioSubsection = '';
                        draftNow.active_matrix_id = fallback.id;
                        applyMetBioGroupToRoot(fallback, draftNow);
                    } else if (fallback && !draftNow.matrix_groups.some(function(g) { return g.id === draftNow.active_matrix_id; })) {
                        draftNow.active_matrix_id = fallback.id;
                    }
                    draftNow.dirty = true;
                    updateTechStatus('Cambios sin guardar');
                    buildTechTree();
                    selectTechItem('metodologias_bio', { skipSyncCurrent: true });
                });
            });
        }
        var quillEditors = {};
        var suppressQuillSync = false;
        var techMetFQSubsections = [
            { id: 'protocolo_estudio', title: 'Protocolo de muestreo', fields: ['Introducción', 'Puntos de muestreo', 'Imagen asociada', 'Descripción'] },
            { id: 'parametros_laboratorios', title: 'Parámetros a Analizar y Laboratorios', fields: ['Texto introductorio', 'Control de análisis', 'Texto final'] },
            { id: 'parametros_in_situ', title: 'Parámetros medidos in situ', fields: ['Texto introductorio', 'Parámetros de terreno', 'Texto final'] }
        ];
        var techMetBioSubsections = [
            { id: 'protocolo_estudio', title: 'Protocolo de muestreo', fields: ['Introducción', 'Puntos de muestreo', 'Imagen asociada', 'Descripción'] },
            { id: 'protocolo_transectas', title: 'Protocolo de muestreo Transectas', fields: ['Introducción', 'Puntos de muestreo', 'Imagen asociada', 'Descripción'] }
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
        techDrafts.metodologias_bio = {
            protocolo_intro: '',
            protocolo_puntos: [],
            protocolo_imagen: '',
            protocolo_imagen_name: '',
            protocolo_descripcion: '',
            transectas_intro: '',
            transectas_puntos: [],
            transectas_imagen: '',
            transectas_imagen_name: '',
            transectas_descripcion: '',
            especificaciones_texto: '',
            especificaciones_descripcion: '',
            fitoplancton_cualitativo: false,
            fitoplancton_cuantitativo: false,
            zoo_ictio_vertical_diurno: false,
            zoo_ictio_vertical_nocturno: false,
            zoo_ictio_horizontal_diurno: false,
            zoo_ictio_horizontal_nocturno: false,
            censo_mar_diurno: false,
            censo_mar_nocturno: false,
            censo_tierra_diurno: false,
            censo_tierra_nocturno: false,
            updatedAt: ''
        };
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
        var SHARED_LAB_CATALOG_KEY = 'qcotizaciones.labCatalog';
        var SHARED_LAB_SELECTED_KEY = 'qcotizaciones.labSelected';
        var SHARED_FIELD_SELECTED_KEY = 'qcotizaciones.fieldSelected';

        function normalizeLabSelectedItem(item) {
            return {
                parametro: item.parametro || '',
                unidad: item.unidad || '—',
                limite: item.limite || '—',
                metodologia: item.metodologia || item.metodo || '—',
                laboratorios: item.laboratorios || item.laboratorio || 'Lab. Santiago - ENV',
                matriz: item.matriz || '',
                afectaETFA: item.afectaETFA || '',
                etfaCode: item.etfaCode || '',
                laboratorio: item.laboratorio || item.laboratorios || 'Lab. Santiago - ENV'
            };
        }

        function saveSharedLabSelected(selected) {
            try {
                localStorage.setItem(SHARED_LAB_SELECTED_KEY, JSON.stringify((selected || []).map(normalizeLabSelectedItem)));
            } catch (e) {}
        }

        function loadSharedLabSelected() {
            try {
                var raw = localStorage.getItem(SHARED_LAB_SELECTED_KEY);
                if (!raw) return [];
                var parsed = JSON.parse(raw);
                if (!Array.isArray(parsed)) return [];
                return parsed.map(normalizeLabSelectedItem).filter(function(item) { return !!item.parametro; });
            } catch (e) {
                return [];
            }
        }

        function normalizeFieldSelectedItem(item) {
            return {
                parametro: item.parametro || '',
                metodo: item.metodo || '—',
                matriz: item.matriz || '',
                afectaETFA: item.afectaETFA || '',
                etfaCode: item.etfaCode || '',
                instrumento: item.instrumento || ''
            };
        }

        function saveSharedFieldSelected(selected) {
            try {
                localStorage.setItem(SHARED_FIELD_SELECTED_KEY, JSON.stringify((selected || []).map(normalizeFieldSelectedItem)));
            } catch (e) {}
        }

        function loadSharedFieldSelected() {
            try {
                var raw = localStorage.getItem(SHARED_FIELD_SELECTED_KEY);
                if (!raw) return [];
                var parsed = JSON.parse(raw);
                if (!Array.isArray(parsed)) return [];
                return parsed.map(normalizeFieldSelectedItem).filter(function(item) { return !!item.parametro; });
            } catch (e) {
                return [];
            }
        }

        function generarCodigoEtfa(parametro, base) {
            var text = (parametro || '').toString();
            var hash = 0;
            for (var i = 0; i < text.length; i++) {
                hash = (hash * 31 + text.charCodeAt(i)) % 900000;
            }
            return String((base || 2000000) + hash);
        }

        function mapLabNameToDisplay(labName) {
            var raw = (labName || '').toString().trim();
            if (!raw) return 'Lab. Santiago - ENV';
            if (raw.toLowerCase().indexOf('lab.') === 0) return raw;
            return 'Lab. ' + raw + ' - ENV';
        }

        function mapPresentationToMatrixValue(presentationText) {
            var normalized = (presentationText || '').toString().toLowerCase();
            if (normalized.indexOf('mar') !== -1) return 'AGUA_MAR_E';
            if (normalized.indexOf('residual') !== -1) return 'AGUA_RESIDUAL_F';
            return '';
        }

        function collectLabCatalogFromCotizacionGrid() {
            var rows = Array.from(document.querySelectorAll('#divGruposServicioLab .service-group tbody tr:not(.empty-row)'));
            var byKey = {};

            rows.forEach(function(row) {
                if (row.classList.contains('empty-row')) return;
                var cells = row.querySelectorAll('td');
                if (!cells || cells.length < 11) return;

                var nameEl = row.querySelector('.lab-service-name');
                var methodEl = row.querySelector('.lab-service-method');
                var codeEl = row.querySelector('.lab-service-code strong');
                var labEl = row.querySelector('.js-lab-laboratorio');
                var groupEl = row.closest('.service-group');
                var presentationTag = '';
                if (groupEl) {
                    var tags = Array.from(groupEl.querySelectorAll('.service-tags .service-tag')).map(function(el) { return (el.textContent || '').trim(); });
                    presentationTag = tags.length > 1 ? tags[1] : (tags[0] || '');
                }
                var matrixValue = mapPresentationToMatrixValue(presentationTag);
                if (!matrixValue) return;

                var parametro = nameEl ? nameEl.textContent.trim() : (cells[1] ? cells[1].textContent.trim() : '');
                var metodologia = methodEl ? methodEl.textContent.trim() : '';
                if (!parametro) return;
                var unidad = cells[5] ? cells[5].textContent.trim() : '';
                var limite = cells[2] ? cells[2].textContent.trim() : '';
                var etfaCode = codeEl ? codeEl.textContent.trim() : '';
                var etfaEl = row.querySelector('.js-lab-etfa');
                var afectaETFA = etfaEl ? (etfaEl.checked ? 'SI' : 'NO') : 'NO';
                var laboratorio = mapLabNameToDisplay(labEl ? labEl.value : '');
                var key = (matrixValue + '|' + parametro + '|' + metodologia + '|' + laboratorio).toLowerCase();

                if (!byKey[key]) {
                    byKey[key] = {
                        parametro: parametro,
                        unidad: unidad || '—',
                        limite: limite || '—',
                        metodologia: metodologia || '—',
                        laboratorios: laboratorio,
                        metodo: metodologia || '—',
                        laboratorio: laboratorio,
                        matriz: matrixValue,
                        afectaETFA: afectaETFA,
                        etfaCode: etfaCode || ''
                    };
                }
            });

            return Object.keys(byKey).map(function(k) { return byKey[k]; });
        }

        function getLabCatalogByMatrixFromStep2(matrixValue) {
            var all = syncSharedLabCatalogFromCotizacion();
            return all
                .filter(function(item) { return (item.matriz || '') === (matrixValue || ''); })
                .map(normalizeLabSelectedItem);
        }

        function getLockedMetFQMatricesFromStep2() {
            var locked = {};
            syncSharedLabCatalogFromCotizacion().forEach(function(item) {
                var matrixValue = (item && item.matriz) ? item.matriz : '';
                if (matrixValue) locked[matrixValue] = true;
            });
            return locked;
        }

        function syncSharedLabCatalogFromCotizacion() {
            var fromGrid = collectLabCatalogFromCotizacionGrid();
            if (fromGrid.length > 0) {
                techFQParametroCatalog = fromGrid.slice();
                try {
                    localStorage.setItem(SHARED_LAB_CATALOG_KEY, JSON.stringify(fromGrid));
                } catch (e) {}
                return fromGrid;
            }
            try {
                var raw = localStorage.getItem(SHARED_LAB_CATALOG_KEY);
                if (!raw) return techFQParametroCatalog.slice();
                var parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    techFQParametroCatalog = parsed.slice();
                }
            } catch (e) {}
            return techFQParametroCatalog.slice();
        }

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
                    '<div class="tech-tree-menu" data-menu="' + section.id + '">' +
                        '<button class="tech-tree-menu-btn" data-menu-btn="' + section.id + '"><i class="fas fa-ellipsis-v"></i></button>' +
                        '<div class="tech-tree-menu-content">' +
                            (section.isCustom ? '<button data-menu-edit="' + section.id + '"><i class="fas fa-pen"></i> Editar nombre</button>' : '') +
                            '<button data-menu-add-field="' + section.id + '"><i class="fas fa-plus"></i> Agregar campo</button>' +
                            (section.isCustom ? '<button data-menu-delete="' + section.id + '"><i class="fas fa-trash"></i> Eliminar sección</button>' : '') +
                        '</div>' +
                    '</div>' +
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
                        ensureMetFQMatrixGroups();
                        var fqDraft = techDrafts.metodologias_fq || {};
                        var groups = fqDraft.matrix_groups || [];
                        groups.forEach(function(group) {
                            var groupActive = (activeTechId === 'metodologias_fq' && activeMetFQMatrixId === group.id && !activeMetFQSubsection) ? ' active' : '';
                            html += '<div class="tech-tree-item tech-tree-subsection' + groupActive + '" data-tech-id="metodologias_fq" data-metfq-group-id="' + group.id + '">' +
                                '<i class="fas fa-layer-group"></i>' +
                                '<span class="tech-tree-name tech-tree-matrix-name">' + getMetFQMatrixLabel(group.matriz) + '</span>' +
                            '</div>';
                            html += '<div class="tech-tree-subfields">';
                            techMetFQSubsections.forEach(function(sub) {
                                var activeSub = (activeTechId === 'metodologias_fq' && activeMetFQMatrixId === group.id && activeMetFQSubsection === sub.id) ? ' active' : '';
                                html += '<div class="tech-tree-item tech-tree-subsection' + activeSub + '" data-tech-id="metodologias_fq" data-metfq-group-id="' + group.id + '" data-metfq-subsection="' + sub.id + '">' +
                                    '<i class="fas fa-file-alt"></i>' +
                                    '<span class="tech-tree-name">' + sub.title + '</span>' +
                                '</div>';
                            });
                            html += '</div>';
                        });
                    } else if (section.id === 'metodologias_bio') {
                        ensureMetBioMatrixGroups();
                        var bioDraft = techDrafts.metodologias_bio || {};
                        var bioGroups = bioDraft.matrix_groups || [];
                        bioGroups.forEach(function(group) {
                            var groupActive = (activeTechId === 'metodologias_bio' && activeMetBioMatrixId === group.id && !activeMetBioSubsection) ? ' active' : '';
                            html += '<div class="tech-tree-item tech-tree-subsection' + groupActive + '" data-tech-id="metodologias_bio" data-metbio-group-id="' + group.id + '">' +
                                '<i class="fas fa-layer-group"></i>' +
                                '<span class="tech-tree-name tech-tree-matrix-name">' + getMetBioMatrixLabel(group.matriz) + '</span>' +
                            '</div>';
                            html += '<div class="tech-tree-subfields">';
                            getMetBioSubsectionsForMatrix(group.matriz).forEach(function(sub) {
                                var activeSub = (activeTechId === 'metodologias_bio' && activeMetBioMatrixId === group.id && activeMetBioSubsection === sub.id) ? ' active' : '';
                                html += '<div class="tech-tree-item tech-tree-subsection' + activeSub + '" data-tech-id="metodologias_bio" data-metbio-group-id="' + group.id + '" data-metbio-subsection="' + sub.id + '">' +
                                    '<i class="fas fa-file-alt"></i>' +
                                    '<span class="tech-tree-name">' + sub.title + '</span>' +
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
                    // Campos extra agregados por el usuario a esta sección de plantilla
                    (section.extraFields || []).forEach(function(f) {
                        html += '<div class="tech-tree-field" draggable="true" data-field-parent="' + section.id + '" data-field-name="' + escapeHtml(f) + '">' +
                            '<i class="fas fa-file-alt" style="color:#b5b0a8;"></i>' +
                            '<span class="tech-tree-field-name">' + escapeHtml(f) + '</span>' +
                            '<div class="tech-tree-menu" data-menu-field="' + section.id + '" data-menu-field-name="' + escapeHtml(f) + '">' +
                                '<button class="tech-tree-menu-btn" data-menu-field-btn="' + section.id + '" data-menu-field-name="' + escapeHtml(f) + '"><i class="fas fa-ellipsis-v"></i></button>' +
                                '<div class="tech-tree-menu-content">' +
                                    '<button data-menu-field-edit="' + section.id + '" data-menu-field-name="' + escapeHtml(f) + '"><i class="fas fa-pen"></i> Editar</button>' +
                                    '<button data-menu-field-delete="' + section.id + '" data-menu-field-name="' + escapeHtml(f) + '"><i class="fas fa-trash"></i> Eliminar</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                    });
                }
                html += '</div>';
            });

            tree.innerHTML = html ? '<div class="tech-tree-list">' + html + '</div>' : '<div class="tech-editor-hint" style="padding:10px 12px;">Sin resultados</div>';

            // Ocultar botón + cuando la sección activa es de plantilla (no custom)
            var addBtn = document.getElementById('techAddTopicBtn');
            if (addBtn) {
                var activeSection = getAllSections().find(function(s) { return s.id === activeTechId; });
                var isActiveCustom = !activeSection || activeSection.isCustom;
                addBtn.style.display = isActiveCustom ? '' : 'none';
            }

            tree.querySelectorAll('.tech-tree-item[data-tech-id]').forEach(function(row) {
                row.addEventListener('click', function(e) {
                    if (e.target && (e.target.closest('.tech-tree-menu') || e.target.closest('.tech-tree-toggle') || e.target.closest('[data-expand]'))) return;
                    var id = this.getAttribute('data-tech-id');
                    var subId = this.getAttribute('data-metfq-subsection');
                    var groupId = this.getAttribute('data-metfq-group-id');
                    var bioSubId = this.getAttribute('data-metbio-subsection');
                    var bioGroupId = this.getAttribute('data-metbio-group-id');
                    var section = getAllSections().find(function(s) { return s.id === id; });
                    if (section && section.enabled === false) return;
                    if (id === 'metodologias_fq') {
                        var skipCurrentSync = activeTechId === 'metodologias_fq';
                        if (skipCurrentSync) {
                            syncRootToActiveMetFQGroup();
                        }
                        if (groupId) {
                            ensureMetFQMatrixGroups();
                            var fqDraft = techDrafts.metodologias_fq || {};
                            var group = (fqDraft.matrix_groups || []).find(function(g) { return g.id === groupId; });
                            if (group) {
                                activeMetFQMatrixId = groupId;
                                fqDraft.active_matrix_id = groupId;
                                applyMetFQGroupToRoot(group, fqDraft);
                            }
                        }
                        activeMetFQSubsection = subId || '';
                        selectTechItem(id, { skipSyncCurrent: skipCurrentSync });
                        return;
                    } else if (id === 'metodologias_bio') {
                        var skipBioSync = activeTechId === 'metodologias_bio';
                        if (skipBioSync) {
                            syncRootToActiveMetBioGroup();
                        }
                        if (bioGroupId) {
                            ensureMetBioMatrixGroups();
                            var bioDraftNow = techDrafts.metodologias_bio || {};
                            var bioGroup = (bioDraftNow.matrix_groups || []).find(function(g) { return g.id === bioGroupId; });
                            if (bioGroup) {
                                activeMetBioMatrixId = bioGroupId;
                                bioDraftNow.active_matrix_id = bioGroupId;
                                applyMetBioGroupToRoot(bioGroup, bioDraftNow);
                            }
                        }
                        activeMetBioSubsection = bioSubId || '';
                        selectTechItem(id, { skipSyncCurrent: skipBioSync });
                        return;
                    }
                    selectTechItem(id);
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
                    if (section.isCustom) {
                        section.fields = section.fields || [];
                        section.fields.push('Nuevo campo');
                    } else {
                        section.extraFields = section.extraFields || [];
                        section.extraFields.push('Nuevo campo');
                    }
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
                        var newVal = input.value.trim() || name;
                        var arr = section.isCustom ? (section.fields || []) : (section.extraFields || []);
                        var index = arr.indexOf(name);
                        if (index >= 0) arr[index] = newVal;
                        var draftKey = section.isCustom ? 'fields' : 'extraFields';
                        if (techDrafts[id] && techDrafts[id][draftKey] && name !== newVal) {
                            if (Object.prototype.hasOwnProperty.call(techDrafts[id][draftKey], name)) {
                                techDrafts[id][draftKey][newVal] = techDrafts[id][draftKey][name];
                                delete techDrafts[id][draftKey][name];
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
                    if (section.isCustom) {
                        section.fields = (section.fields || []).filter(function(f) { return f !== name; });
                    } else {
                        section.extraFields = (section.extraFields || []).filter(function(f) { return f !== name; });
                    }
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
                var protocolHtml = '<table class="tech-fq-protocol-table"><thead><tr><th>#</th><th>Estación</th><th>Lugar</th><th>Matriz</th><th>Latitud</th><th>Longitud</th><th>Est.</th><th>Rep.</th><th>Muestras</th></tr></thead><tbody>';
                if (puntosProtocolo.length) {
                    puntosProtocolo.forEach(function(p, idx) {
                        var e = parseInt(p.estratos, 10) || 1;
                        var r = parseInt(p.replicas, 10) || 1;
                        var m = Math.max(1, parseInt(p.muestras, 10) || (e * r));
                        protocolHtml += '<tr><td>' + (idx + 1) + '</td><td>' + (p.nombre || p.estacion || '—') + '</td><td>' + (p.lugar || '—') + '</td><td>' + (p.matriz || '—') + '</td><td>' + (p.latitud || p.coordenadas || '—') + '</td><td>' + (p.longitud || '—') + '</td><td>' + e + '</td><td>' + r + '</td><td>' + m + '</td></tr>';
                    });
                } else {
                    protocolHtml += '<tr><td colspan="9" style="text-align:center;color:#aaa;">Sin puntos de muestreo</td></tr>';
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
                    '<div class="tech-doc-title">Protocolo de muestreo</div>' +
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
                        '<div class="tech-doc-title">Protocolo de muestreo</div>' +
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
            var table = document.getElementById('techMetFQParamTable');
            if (!tbody) return;
            var draft = techDrafts.metodologias_fq || {};
            var activeMatrix = getActiveMetFQMatrixValue();
            var currentSelected = (draft.selectedParams || []).map(normalizeLabSelectedItem);
            var preservedByKey = {};
            currentSelected.forEach(function(item) {
                var key = ((item.parametro || '') + '|' + (item.metodologia || '') + '|' + (item.laboratorios || item.laboratorio || '')).toLowerCase();
                preservedByKey[key] = item;
            });
            var selected = getLabCatalogByMatrixFromStep2(activeMatrix).map(function(item) {
                var key = ((item.parametro || '') + '|' + (item.metodologia || '') + '|' + (item.laboratorios || item.laboratorio || '')).toLowerCase();
                var prev = preservedByKey[key];
                if (!prev) return item;
                return normalizeLabSelectedItem({
                    parametro: item.parametro,
                    unidad: item.unidad,
                    limite: item.limite,
                    metodologia: item.metodologia,
                    laboratorios: item.laboratorios,
                    laboratorio: item.laboratorio,
                    afectaETFA: prev.afectaETFA || 'SI',
                    etfaCode: prev.etfaCode || item.etfaCode || ''
                });
            }).map(function(item) {
                if (!item.afectaETFA) item.afectaETFA = 'SI';
                if (item.afectaETFA === 'SI' && !item.etfaCode) {
                    item.etfaCode = generarCodigoEtfa(item.parametro, 2000000);
                }
                return item;
            });
            draft.selectedParams = selected;
            tbody.innerHTML = '';
            if (selected.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:#aaa;">No hay análisis de laboratorio para esta matriz en el Paso 2.</td></tr>';
                if (table) {
                    table.querySelectorAll('.etfa-validation-col').forEach(function(cell) {
                        cell.style.display = 'none';
                    });
                }
                return;
            }
            selected.forEach(function(item, idx) {
                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td>' + (idx + 1) + '</td>' +
                    '<td>' + (item.parametro || '—') + '</td>' +
                    '<td style="font-size:11px;color:#9a9a9a;">' + (item.metodologia || '—') + '</td>' +
                    '<td>' + (item.limite || '—') + '</td>' +
                    '<td>' + (item.unidad || '—') + '</td>' +
                    '<td>' +
                        '<label class="lab-etfa-inline" style="justify-content:center;"><input type="checkbox" data-fq-etfa="' + idx + '"' + (item.afectaETFA !== 'NO' ? ' checked' : '') + '> Sí</label>' +
                    '</td>' +
                    '<td class="etfa-validation-col" style="display:none;">' +
                        (item.afectaETFA === 'SI' && activeMatrix
                            ? '<span class="ok"><i class="fas fa-check-circle"></i> ' + (item.etfaCode || generarCodigoEtfa(item.parametro, 2000000)) + '</span>'
                            : '<span class="na">-</span>') +
                    '</td>' +
                    '<td>' + (item.laboratorios || item.laboratorio || '—') + '</td>';
                tbody.appendChild(tr);
            });
            tbody.querySelectorAll('input[data-fq-etfa]').forEach(function(el) {
                el.addEventListener('change', function() {
                    var i = parseInt(this.getAttribute('data-fq-etfa'), 10);
                    if (isNaN(i) || !techDrafts.metodologias_fq.selectedParams[i]) return;
                    techDrafts.metodologias_fq.selectedParams[i].afectaETFA = this.checked ? 'SI' : 'NO';
                    if (this.checked
                        && activeMatrix
                        && !techDrafts.metodologias_fq.selectedParams[i].etfaCode) {
                        techDrafts.metodologias_fq.selectedParams[i].etfaCode = generarCodigoEtfa(techDrafts.metodologias_fq.selectedParams[i].parametro, 2000000);
                    }
                    techDrafts.metodologias_fq.dirty = true;
                    syncRootToActiveMetFQGroup();
                    updateTechStatus('Cambios sin guardar');
                    renderMetFQTable();
                    renderTechDocView();
                    renderTechDocFull();
                });
            });

            var showEtfaValidation = selected.some(function(item) { return item.afectaETFA === 'SI'; });
            if (table) {
                table.querySelectorAll('.etfa-validation-col').forEach(function(cell) {
                    cell.style.display = showEtfaValidation ? 'table-cell' : 'none';
                });
            }
            syncRootToActiveMetFQGroup();
        }

        function renderMetFQProtocolTable() {
            var tbody = document.getElementById('techFQEstacionesBody');
            var countEl = document.getElementById('techFQCountPuntos');
            var totalEl = document.getElementById('techFQTotalMuestras');
            if (!tbody) return;
            var draft = techDrafts.metodologias_fq || {};
            if (!Array.isArray(draft.protocolo_puntos)) draft.protocolo_puntos = [];

            tbody.innerHTML = '';
            var totalMuestras = 0;
            draft.protocolo_puntos.forEach(function(punto, idx) {
                var estratos = parseInt(punto.estratos, 10) || 1;
                var replicas = parseInt(punto.replicas, 10) || 1;
                var muestras = estratos * replicas;
                totalMuestras += muestras;
                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td>' + (idx + 1) + '</td>' +
                    '<td><input type="text" class="fq-inline" data-fq-field="nombre" data-fq-idx="' + idx + '" value="' + escapeHtml(punto.nombre || punto.estacion || '') + '"></td>' +
                    '<td><input type="text" class="fq-inline" data-fq-field="lugar" data-fq-idx="' + idx + '" value="' + escapeHtml(punto.lugar || '') + '"></td>' +
                    '<td><input type="text" class="fq-inline" data-fq-field="latitud" data-fq-idx="' + idx + '" value="' + escapeHtml(punto.latitud || punto.coordenadas || '') + '"></td>' +
                    '<td><input type="text" class="fq-inline" data-fq-field="longitud" data-fq-idx="' + idx + '" value="' + escapeHtml(punto.longitud || '') + '"></td>' +
                    '<td><input type="text" class="fq-inline" data-fq-field="datum" data-fq-idx="' + idx + '" value="' + escapeHtml(punto.datum || '') + '"></td>' +
                    '<td><input type="number" class="fq-inline fq-inline-num fq-est-estratos" data-fq-idx="' + idx + '" value="' + estratos + '" min="1"></td>' +
                    '<td><input type="number" class="fq-inline fq-inline-num fq-est-replicas" data-fq-idx="' + idx + '" value="' + replicas + '" min="1"></td>' +
                    '<td class="fq-muestras-cell">' + muestras + '</td>' +
                    '<td><button class="fq-remove-btn" data-fq-remove="' + idx + '" title="Quitar"><i class="fas fa-times"></i></button></td>';
                tbody.appendChild(tr);
            });

            if (countEl) countEl.textContent = draft.protocolo_puntos.length;
            if (totalEl) totalEl.textContent = totalMuestras;

            tbody.querySelectorAll('input[data-fq-field]').forEach(function(inp) {
                inp.addEventListener('input', function() {
                    var i = parseInt(this.getAttribute('data-fq-idx'), 10);
                    var f = this.getAttribute('data-fq-field');
                    if (isNaN(i) || !f || !techDrafts.metodologias_fq.protocolo_puntos[i]) return;
                    techDrafts.metodologias_fq.protocolo_puntos[i][f] = this.value;
                    techDrafts.metodologias_fq.dirty = true;
                    updateTechStatus('Cambios sin guardar');
                    renderTechDocView();
                });
            });

            tbody.querySelectorAll('.fq-est-estratos, .fq-est-replicas').forEach(function(inp) {
                inp.addEventListener('input', function() {
                    var i = parseInt(this.getAttribute('data-fq-idx'), 10);
                    if (isNaN(i) || !techDrafts.metodologias_fq.protocolo_puntos[i]) return;
                    var row = this.closest('tr');
                    var eEl = row.querySelector('.fq-est-estratos');
                    var rEl = row.querySelector('.fq-est-replicas');
                    var mEl = row.querySelector('.fq-muestras-cell');
                    var e = Math.max(1, parseInt(eEl ? eEl.value : '1', 10) || 1);
                    var r = Math.max(1, parseInt(rEl ? rEl.value : '1', 10) || 1);
                    var m = e * r;
                    if (eEl) eEl.value = e;
                    if (rEl) rEl.value = r;
                    if (mEl) mEl.textContent = m;
                    techDrafts.metodologias_fq.protocolo_puntos[i].estratos = e;
                    techDrafts.metodologias_fq.protocolo_puntos[i].replicas = r;
                    techDrafts.metodologias_fq.protocolo_puntos[i].muestras = m;
                    techDrafts.metodologias_fq.dirty = true;
                    updateTechStatus('Cambios sin guardar');
                    var total = 0;
                    tbody.querySelectorAll('.fq-muestras-cell').forEach(function(c) { total += parseInt(c.textContent, 10) || 0; });
                    if (totalEl) totalEl.textContent = total;
                });
            });

            tbody.querySelectorAll('button[data-fq-remove]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var i = parseInt(this.getAttribute('data-fq-remove'), 10);
                    if (isNaN(i)) return;
                    techDrafts.metodologias_fq.protocolo_puntos.splice(i, 1);
                    techDrafts.metodologias_fq.dirty = true;
                    updateTechStatus('Cambios sin guardar');
                    renderMetFQProtocolTable();
                    renderTechDocView();
                });
            });
        }

        function getActiveMetBioProtocolConfig() {
            if (activeMetBioSubsection === 'protocolo_transectas') {
                return { key: 'transectas', intro: 'transectas_intro', puntos: 'transectas_puntos', imagen: 'transectas_imagen', imagen_name: 'transectas_imagen_name', descripcion: 'transectas_descripcion' };
            }
            return { key: 'protocolo', intro: 'protocolo_intro', puntos: 'protocolo_puntos', imagen: 'protocolo_imagen', imagen_name: 'protocolo_imagen_name', descripcion: 'protocolo_descripcion' };
        }

        function renderMetBioProtocolTable() {
            var tbody = document.getElementById('techBioEstacionesBody');
            var countEl = document.getElementById('techBioCountPuntos');
            var totalEl = document.getElementById('techBioTotalMuestras');
            if (!tbody) return;
            var draft = techDrafts.metodologias_bio || {};
            var cfg = getActiveMetBioProtocolConfig();
            if (!Array.isArray(draft[cfg.puntos])) draft[cfg.puntos] = [];

            tbody.innerHTML = '';
            var totalMuestras = 0;
            draft[cfg.puntos].forEach(function(punto, idx) {
                var estratos = parseInt(punto.estratos, 10) || 1;
                var replicas = parseInt(punto.replicas, 10) || 1;
                var muestras = estratos * replicas;
                totalMuestras += muestras;
                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td>' + (idx + 1) + '</td>' +
                    '<td><input type="text" class="fq-inline" data-bio-field="nombre" data-bio-idx="' + idx + '" value="' + escapeHtml(punto.nombre || punto.estacion || '') + '"></td>' +
                    '<td><input type="text" class="fq-inline" data-bio-field="lugar" data-bio-idx="' + idx + '" value="' + escapeHtml(punto.lugar || '') + '"></td>' +
                    '<td><input type="text" class="fq-inline" data-bio-field="latitud" data-bio-idx="' + idx + '" value="' + escapeHtml(punto.latitud || punto.coordenadas || '') + '"></td>' +
                    '<td><input type="text" class="fq-inline" data-bio-field="longitud" data-bio-idx="' + idx + '" value="' + escapeHtml(punto.longitud || '') + '"></td>' +
                    '<td><input type="text" class="fq-inline" data-bio-field="datum" data-bio-idx="' + idx + '" value="' + escapeHtml(punto.datum || '') + '"></td>' +
                    '<td><input type="number" class="fq-inline fq-inline-num bio-est-estratos" data-bio-idx="' + idx + '" value="' + estratos + '" min="1"></td>' +
                    '<td><input type="number" class="fq-inline fq-inline-num bio-est-replicas" data-bio-idx="' + idx + '" value="' + replicas + '" min="1"></td>' +
                    '<td class="bio-muestras-cell">' + muestras + '</td>' +
                    '<td><button class="fq-remove-btn" data-bio-remove="' + idx + '" title="Quitar"><i class="fas fa-times"></i></button></td>';
                tbody.appendChild(tr);
            });

            if (countEl) countEl.textContent = draft[cfg.puntos].length;
            if (totalEl) totalEl.textContent = totalMuestras;

            tbody.querySelectorAll('input[data-bio-field]').forEach(function(inp) {
                inp.addEventListener('input', function() {
                    var i = parseInt(this.getAttribute('data-bio-idx'), 10);
                    var f = this.getAttribute('data-bio-field');
                    if (isNaN(i) || !f || !techDrafts.metodologias_bio[cfg.puntos] || !techDrafts.metodologias_bio[cfg.puntos][i]) return;
                    techDrafts.metodologias_bio[cfg.puntos][i][f] = this.value;
                    techDrafts.metodologias_bio.dirty = true;
                    syncRootToActiveMetBioGroup();
                    updateTechStatus('Cambios sin guardar');
                    renderTechDocView();
                });
            });

            tbody.querySelectorAll('.bio-est-estratos, .bio-est-replicas').forEach(function(inp) {
                inp.addEventListener('input', function() {
                    var i = parseInt(this.getAttribute('data-bio-idx'), 10);
                    if (isNaN(i) || !techDrafts.metodologias_bio[cfg.puntos] || !techDrafts.metodologias_bio[cfg.puntos][i]) return;
                    var row = this.closest('tr');
                    var eEl = row.querySelector('.bio-est-estratos');
                    var rEl = row.querySelector('.bio-est-replicas');
                    var mEl = row.querySelector('.bio-muestras-cell');
                    var e = Math.max(1, parseInt(eEl ? eEl.value : '1', 10) || 1);
                    var r = Math.max(1, parseInt(rEl ? rEl.value : '1', 10) || 1);
                    var m = e * r;
                    if (eEl) eEl.value = e;
                    if (rEl) rEl.value = r;
                    if (mEl) mEl.textContent = m;
                    techDrafts.metodologias_bio[cfg.puntos][i].estratos = e;
                    techDrafts.metodologias_bio[cfg.puntos][i].replicas = r;
                    techDrafts.metodologias_bio[cfg.puntos][i].muestras = m;
                    techDrafts.metodologias_bio.dirty = true;
                    syncRootToActiveMetBioGroup();
                    updateTechStatus('Cambios sin guardar');
                    var total = 0;
                    tbody.querySelectorAll('.bio-muestras-cell').forEach(function(c) { total += parseInt(c.textContent, 10) || 0; });
                    if (totalEl) totalEl.textContent = total;
                });
            });

            tbody.querySelectorAll('button[data-bio-remove]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var i = parseInt(this.getAttribute('data-bio-remove'), 10);
                    if (isNaN(i)) return;
                    techDrafts.metodologias_bio[cfg.puntos].splice(i, 1);
                    techDrafts.metodologias_bio.dirty = true;
                    syncRootToActiveMetBioGroup();
                    updateTechStatus('Cambios sin guardar');
                    renderMetBioProtocolTable();
                    renderTechDocView();
                });
            });
        }

        function renderMetFQInSituTable() {
            var tbody = document.getElementById('techMetFQInSituTableBody');
            var table = document.getElementById('techMetFQInSituTable');
            if (!tbody) return;
            var draft = techDrafts.metodologias_fq || {};
            var activeMatrix = getActiveMetFQMatrixValue();
            var selected = (draft.in_situ_selected || []).map(normalizeFieldSelectedItem);
            draft.in_situ_selected = selected;
            tbody.innerHTML = '';
            if (selected.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#aaa;">No hay parámetros seleccionados. Use el botón "Seleccionar parámetros de terreno" para agregar.</td></tr>';
                if (table) {
                    table.querySelectorAll('.etfa-validation-col').forEach(function(cell) {
                        cell.style.display = 'none';
                    });
                }
                return;
            }
            selected.forEach(function(item, idx) {
                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td>' + (idx + 1) + '</td>' +
                    '<td>' + (item.parametro || '—') + '</td>' +
                    '<td style="font-size:11px;color:#9a9a9a;">' + (item.metodo || '—') + '</td>' +
                    '<td>' +
                        '<select class="form-control-inline" data-insitu-idx="' + idx + '" data-field="afectaETFA">' +
                            '<option value="">Seleccionar</option>' +
                            '<option value="SI"' + (item.afectaETFA === 'SI' ? ' selected' : '') + '>Sí</option>' +
                            '<option value="NO"' + (item.afectaETFA === 'NO' ? ' selected' : '') + '>No</option>' +
                        '</select>' +
                    '</td>' +
                    '<td class="etfa-validation-col" style="display:none;">' +
                        (item.afectaETFA === 'SI' && activeMatrix
                            ? '<span class="ok"><i class="fas fa-check-circle"></i> ' + (item.etfaCode || generarCodigoEtfa(item.parametro, 1000000)) + '</span>'
                            : '<span class="na">-</span>') +
                    '</td>' +
                    '<td>' +
                        '<select class="form-control-inline" data-insitu-idx="' + idx + '" data-field="instrumento">' +
                            '<option value="">Seleccionar</option>' +
                            '<option value="CTDO"' + (item.instrumento === 'CTDO' ? ' selected' : '') + '>CTDO</option>' +
                            '<option value="MEDIDOR_TURBIDEZ"' + (item.instrumento === 'MEDIDOR_TURBIDEZ' ? ' selected' : '') + '>Medidor de turbidez</option>' +
                            '<option value="MULTIPARAMETRO"' + (item.instrumento === 'MULTIPARAMETRO' ? ' selected' : '') + '>Multiparámetro</option>' +
                            '<option value="POTENCIOMETROS"' + (item.instrumento === 'POTENCIOMETROS' ? ' selected' : '') + '>Potenciómetros (pH y ORP)</option>' +
                            '<option value="CLORIMETRO"' + (item.instrumento === 'CLORIMETRO' ? ' selected' : '') + '>Clorímetro</option>' +
                            '<option value="CORRENTOMETRO"' + (item.instrumento === 'CORRENTOMETRO' ? ' selected' : '') + '>Correntómetro</option>' +
                            '<option value="ADCP"' + (item.instrumento === 'ADCP' ? ' selected' : '') + '>ADCP</option>' +
                            '<option value="ESTACION_MET"' + (item.instrumento === 'ESTACION_MET' ? ' selected' : '') + '>Estación meteorológica</option>' +
                            '<option value="MAREOGRAFO"' + (item.instrumento === 'MAREOGRAFO' ? ' selected' : '') + '>Mareógrafo</option>' +
                            '<option value="GPS"' + (item.instrumento === 'GPS' ? ' selected' : '') + '>GPS</option>' +
                            '<option value="ROV"' + (item.instrumento === 'ROV' ? ' selected' : '') + '>ROV</option>' +
                            '<option value="ECOSONDA_MULTIHAZ"' + (item.instrumento === 'ECOSONDA_MULTIHAZ' ? ' selected' : '') + '>Ecosonda Multihaz</option>' +
                        '</select>' +
                    '</td>' +
                    '<td><button class="btn-remove" data-insitu-remove="' + idx + '" title="Quitar"><i class="fas fa-times"></i></button></td>';
                tbody.appendChild(tr);
            });
            tbody.querySelectorAll('select[data-insitu-idx]').forEach(function(el) {
                el.addEventListener('change', function() {
                    var i = parseInt(this.getAttribute('data-insitu-idx'), 10);
                    var field = this.getAttribute('data-field');
                    if (isNaN(i) || !field || !techDrafts.metodologias_fq.in_situ_selected[i]) return;
                    techDrafts.metodologias_fq.in_situ_selected[i][field] = this.value;
                    if (field === 'afectaETFA'
                        && techDrafts.metodologias_fq.in_situ_selected[i].afectaETFA === 'SI'
                        && activeMatrix
                        && !techDrafts.metodologias_fq.in_situ_selected[i].etfaCode) {
                        techDrafts.metodologias_fq.in_situ_selected[i].etfaCode = generarCodigoEtfa(techDrafts.metodologias_fq.in_situ_selected[i].parametro, 1000000);
                    }
                    techDrafts.metodologias_fq.dirty = true;
                    syncRootToActiveMetFQGroup();
                    updateTechStatus('Cambios sin guardar');
                    if (field === 'afectaETFA') {
                        renderMetFQInSituTable();
                    }
                    renderTechDocView();
                    renderTechDocFull();
                });
            });
            tbody.querySelectorAll('button[data-insitu-remove]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var i = parseInt(this.getAttribute('data-insitu-remove'), 10);
                    if (isNaN(i)) return;
                    techDrafts.metodologias_fq.in_situ_selected.splice(i, 1);
                    techDrafts.metodologias_fq.dirty = true;
                    syncRootToActiveMetFQGroup();
                    updateTechStatus('Cambios sin guardar');
                    renderMetFQInSituTable();
                    renderTechDocView();
                    renderTechDocFull();
                });
            });

            var showEtfaValidation = selected.some(function(item) { return item.afectaETFA === 'SI'; });
            if (table) {
                table.querySelectorAll('.etfa-validation-col').forEach(function(cell) {
                    cell.style.display = showEtfaValidation ? 'table-cell' : 'none';
                });
            }
            syncRootToActiveMetFQGroup();
        }

        function renderMetFQMatrixSummary() {
            var panel = document.getElementById('techMetFQSummaryPanel');
            if (!panel) return;
            var draft = techDrafts.metodologias_fq || {};
            var matrixLabel = getMetFQMatrixLabel(getActiveMetFQMatrixValue());
            var puntos = Array.isArray(draft.protocolo_puntos) ? draft.protocolo_puntos : [];
            var analisisLab = Array.isArray(draft.selectedParams) ? draft.selectedParams : [];
            var analisisTerreno = Array.isArray(draft.in_situ_selected) ? draft.in_situ_selected : [];
            var totalMuestras = puntos.reduce(function(acc, p) {
                var v = parseInt(p.muestras, 10);
                if (!isNaN(v) && v > 0) return acc + v;
                var e = Math.max(1, parseInt(p.estratos, 10) || 1);
                var r = Math.max(1, parseInt(p.replicas, 10) || 1);
                return acc + (e * r);
            }, 0);
            var etfaLab = analisisLab.filter(function(i) { return i.afectaETFA === 'SI'; }).length;
            var etfaTerreno = analisisTerreno.filter(function(i) { return i.afectaETFA === 'SI'; }).length;

            function toList(items, getter) {
                if (!items.length) return '<div class="tech-editor-hint">Sin registros para esta matriz.</div>';
                return '<ul class="tech-metfq-summary-list">' + items.slice(0, 4).map(function(item) {
                    return '<li>' + escapeHtml(getter(item)) + '</li>';
                }).join('') + '</ul>';
            }

            panel.innerHTML =
                '<div class="tech-metfq-summary-head">' +
                    '<div class="tech-metfq-summary-title">' + escapeHtml(matrixLabel) + '</div>' +
                    '<div class="tech-metfq-summary-hint">Resumen consolidado por matriz</div>' +
                '</div>' +
                '<div class="tech-metfq-summary-kpis">' +
                    '<div class="tech-metfq-kpi"><span class="tech-metfq-kpi-label">Puntos</span><span class="tech-metfq-kpi-value">' + puntos.length + '</span></div>' +
                    '<div class="tech-metfq-kpi"><span class="tech-metfq-kpi-label">Muestras</span><span class="tech-metfq-kpi-value">' + totalMuestras + '</span></div>' +
                    '<div class="tech-metfq-kpi"><span class="tech-metfq-kpi-label">Análisis Lab</span><span class="tech-metfq-kpi-value">' + analisisLab.length + '</span></div>' +
                    '<div class="tech-metfq-kpi"><span class="tech-metfq-kpi-label">Parámetros Terreno</span><span class="tech-metfq-kpi-value">' + analisisTerreno.length + '</span></div>' +
                '</div>' +
                '<div class="tech-metfq-summary-grid">' +
                    '<div class="tech-metfq-summary-box">' +
                        '<div class="tech-metfq-summary-box-title">Protocolo de muestreo</div>' +
                        toList(puntos, function(p) { return p.nombre || p.estacion || 'Punto'; }) +
                    '</div>' +
                    '<div class="tech-metfq-summary-box">' +
                        '<div class="tech-metfq-summary-box-title">Laboratorio (ETFA: ' + etfaLab + ')</div>' +
                        toList(analisisLab, function(p) { return p.parametro || 'Parámetro'; }) +
                    '</div>' +
                    '<div class="tech-metfq-summary-box">' +
                        '<div class="tech-metfq-summary-box-title">Terreno (ETFA: ' + etfaTerreno + ')</div>' +
                        toList(analisisTerreno, function(p) { return p.parametro || 'Parámetro'; }) +
                    '</div>' +
                '</div>';
        }

        function renderMetFQSubsectionPanel() {
            var matrixRow = document.getElementById('techMetFQMatrixGroupRow');
            var resumenRow = document.getElementById('techMetFQResumenRow');
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
            [matrixRow, resumenRow, protocoloRow, protocoloTableRow, protocoloImgRow, protocoloDescRow, paramsIntroRow, paramsControlRow, finalRow, inSituIntroRow, inSituControlRow, inSituFinalRow].forEach(function(row) {
                if (row) row.style.display = 'none';
            });

            if (!activeMetFQSubsection) {
                if (matrixRow) matrixRow.style.display = '';
                if (resumenRow) resumenRow.style.display = '';
                renderMetFQMatrixSummary();
                return;
            }
            if (activeMetFQSubsection === 'protocolo_estudio') {
                if (protocoloRow) protocoloRow.style.display = '';
                if (protocoloTableRow) protocoloTableRow.style.display = '';
                if (protocoloImgRow) protocoloImgRow.style.display = '';
                if (protocoloDescRow) protocoloDescRow.style.display = '';
                return;
            }
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
        }

        function renderMetBioSubsectionPanel() {
            var matrixRow = document.getElementById('techMetBioMatrixGroupRow');
            var protocoloRow = document.getElementById('techMetBioProtocoloRow');
            var protocoloTableRow = document.getElementById('techMetBioProtocoloTableRow');
            var protocoloImgRow = document.getElementById('techMetBioProtocoloImgRow');
            var protocoloDescRow = document.getElementById('techMetBioProtocoloDescRow');
            var especificacionesRow = document.getElementById('techMetBioEspecificacionesRow');
            var especificacionesDescRow = document.getElementById('techMetBioEspecificacionesDescRow');
            [matrixRow, protocoloRow, protocoloTableRow, protocoloImgRow, protocoloDescRow, especificacionesRow, especificacionesDescRow].forEach(function(row) {
                if (row) row.style.display = 'none';
            });

            if (!activeMetBioSubsection) {
                if (matrixRow) matrixRow.style.display = '';
                return;
            }
            if (activeMetBioSubsection === 'protocolo_estudio' || activeMetBioSubsection === 'protocolo_transectas') {
                if (protocoloRow) protocoloRow.style.display = '';
                if (protocoloTableRow) protocoloTableRow.style.display = '';
                if (protocoloImgRow) protocoloImgRow.style.display = '';
                if (protocoloDescRow) protocoloDescRow.style.display = '';
                return;
            }
            if (activeMetBioSubsection === 'especificaciones') {
                if (especificacionesRow) especificacionesRow.style.display = '';
                if (especificacionesDescRow) especificacionesDescRow.style.display = '';
                var fitoMatrixWrap = document.getElementById('techMetBioFitoplanctonMatrixWrap');
                var zooIctioMatrixWrap = document.getElementById('techMetBioZooIctioMatrixWrap');
                var censoMatrixWrap = document.getElementById('techMetBioCensoMatrixWrap');
                var isFitoplancton = getActiveMetBioMatrixValue() === 'FITOPLANCTON';
                var isZooIctio = (getActiveMetBioMatrixValue() === 'ZOOPLANCTON' || getActiveMetBioMatrixValue() === 'ICTIOPLANCTON');
                var isCenso = getActiveMetBioMatrixValue() === 'CENSO_AVES_MAM_REP';
                if (fitoMatrixWrap) fitoMatrixWrap.style.display = isFitoplancton ? '' : 'none';
                if (zooIctioMatrixWrap) zooIctioMatrixWrap.style.display = isZooIctio ? '' : 'none';
                if (censoMatrixWrap) censoMatrixWrap.style.display = isCenso ? '' : 'none';
            }
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
                syncRootToActiveMetFQGroup();
            } else if (activeTechId === 'metodologias_bio') {
                var bioCfg = getActiveMetBioProtocolConfig();
                techDrafts[activeTechId][bioCfg.intro] = getQuillHTML('techEditorMetBioProtocolo');
                techDrafts[activeTechId][bioCfg.descripcion] = getQuillHTML('techEditorMetBioProtocoloDesc');
                techDrafts[activeTechId].especificaciones_descripcion = getQuillHTML('techEditorMetBioEspecificacionesDesc');
                var fitoCualitativo = document.getElementById('techMetBioFitoCualitativo');
                var fitoCuantitativo = document.getElementById('techMetBioFitoCuantitativo');
                var zooIctioVertDiurno = document.getElementById('techMetBioZooIctioVertDiurno');
                var zooIctioVertNocturno = document.getElementById('techMetBioZooIctioVertNocturno');
                var zooIctioHorDiurno = document.getElementById('techMetBioZooIctioHorDiurno');
                var zooIctioHorNocturno = document.getElementById('techMetBioZooIctioHorNocturno');
                var censoMarDiurno = document.getElementById('techMetBioCensoMarDiurno');
                var censoMarNocturno = document.getElementById('techMetBioCensoMarNocturno');
                var censoTierraDiurno = document.getElementById('techMetBioCensoTierraDiurno');
                var censoTierraNocturno = document.getElementById('techMetBioCensoTierraNocturno');
                techDrafts[activeTechId].fitoplancton_cualitativo = !!(fitoCualitativo && fitoCualitativo.checked);
                techDrafts[activeTechId].fitoplancton_cuantitativo = !!(fitoCuantitativo && fitoCuantitativo.checked);
                techDrafts[activeTechId].zoo_ictio_vertical_diurno = !!(zooIctioVertDiurno && zooIctioVertDiurno.checked);
                techDrafts[activeTechId].zoo_ictio_vertical_nocturno = !!(zooIctioVertNocturno && zooIctioVertNocturno.checked);
                techDrafts[activeTechId].zoo_ictio_horizontal_diurno = !!(zooIctioHorDiurno && zooIctioHorDiurno.checked);
                techDrafts[activeTechId].zoo_ictio_horizontal_nocturno = !!(zooIctioHorNocturno && zooIctioHorNocturno.checked);
                techDrafts[activeTechId].censo_mar_diurno = !!(censoMarDiurno && censoMarDiurno.checked);
                techDrafts[activeTechId].censo_mar_nocturno = !!(censoMarNocturno && censoMarNocturno.checked);
                techDrafts[activeTechId].censo_tierra_diurno = !!(censoTierraDiurno && censoTierraDiurno.checked);
                techDrafts[activeTechId].censo_tierra_nocturno = !!(censoTierraNocturno && censoTierraNocturno.checked);
                syncRootToActiveMetBioGroup();
            } else {
                techDrafts[activeTechId].summary = getQuillHTML('techEditorSummary');
                techDrafts[activeTechId].content = getQuillHTML('techEditorContent');
                techDrafts[activeTechId].notes = getQuillHTML('techEditorNotes');
            }

            // Guardar campos extra de secciones de plantilla
            var syncSection = getSectionById(activeTechId);
            if (syncSection && !syncSection.isCustom && (syncSection.extraFields || []).length) {
                if (!techDrafts[activeTechId].extraFields) techDrafts[activeTechId].extraFields = {};
                syncSection.extraFields.forEach(function(field, idx) {
                    var editorId = 'techExtraQuill_' + idx;
                    if (quillEditors[editorId]) {
                        techDrafts[activeTechId].extraFields[field] = getQuillHTML(editorId);
                    }
                });
            }

            if (markDirty) {
                techDrafts[activeTechId].dirty = true;
                updateTechStatus('Cambios sin guardar');
            }
            renderTechDocView();
            renderTechDocFull();
        }

        function selectTechItem(id, options) {
            if (!id) return;

            if (!(options && options.skipSyncCurrent)) {
                syncActiveDraft(false);
            }
            activeTechId = id;

            var section = getAllSections().find(function(s) { return s.id === id; });
            var titleEl = document.getElementById('techEditorTitle');
            var subSepEl = document.getElementById('techEditorSubSep');
            var subTitleEl = document.getElementById('techEditorSubTitle');
            if (titleEl && section) {
                titleEl.textContent = section.title;
            }
            if (subSepEl) subSepEl.style.display = 'none';
            if (subTitleEl) {
                subTitleEl.style.display = 'none';
                subTitleEl.textContent = '';
            }
            if (section && section.id === 'metodologias_fq' && activeMetFQSubsection) {
                var activeSub = techMetFQSubsections.find(function(sub) { return sub.id === activeMetFQSubsection; });
                var draftForBreadcrumb = techDrafts.metodologias_fq || {};
                var activeGroup = (draftForBreadcrumb.matrix_groups || []).find(function(g) { return g.id === activeMetFQMatrixId; });
                var matrixLabel = activeGroup ? getMetFQMatrixLabel(activeGroup.matriz) : '';
                var subLabel = activeSub ? activeSub.title : activeMetFQSubsection;
                if (subSepEl) subSepEl.style.display = '';
                if (subTitleEl) {
                    subTitleEl.style.display = '';
                    subTitleEl.textContent = matrixLabel ? (matrixLabel + ' / ' + subLabel) : subLabel;
                }
            } else if (section && section.id === 'metodologias_bio' && activeMetBioSubsection) {
                var activeBioSub = getMetBioSubsectionsForMatrix(getActiveMetBioMatrixValue()).find(function(sub) { return sub.id === activeMetBioSubsection; });
                var draftForBioBreadcrumb = techDrafts.metodologias_bio || {};
                var activeBioGroup = (draftForBioBreadcrumb.matrix_groups || []).find(function(g) { return g.id === activeMetBioMatrixId; });
                var bioMatrixLabel = activeBioGroup ? getMetBioMatrixLabel(activeBioGroup.matriz) : '';
                var bioSubLabel = activeBioSub ? activeBioSub.title : activeMetBioSubsection;
                if (subSepEl) subSepEl.style.display = '';
                if (subTitleEl) {
                    subTitleEl.style.display = '';
                    subTitleEl.textContent = bioMatrixLabel ? (bioMatrixLabel + ' / ' + bioSubLabel) : bioSubLabel;
                }
            }

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
            var metBioFields = document.getElementById('techEditorMetBioFields');
            var customFields = document.getElementById('techEditorCustomFields');
            var customContainer = document.getElementById('techCustomFieldsContainer');
            var extraFieldsContainer = document.getElementById('techExtraFieldsContainer');
            var extraFieldsEl = document.getElementById('techExtraFields');

            var allPanels = [defaultFields, objetivosFields, normasFields, ubicacionFields, profesionalesFields, coordinacionesFields, autorizacionesFields, metFQFields, metBioFields, customFields, extraFieldsContainer];
            allPanels.forEach(function(p) { if (p) p.style.display = 'none'; });
            Object.keys(quillEditors).forEach(function(key) {
                if (key.indexOf('techExtraQuill_') === 0) delete quillEditors[key];
            });

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
                ensureMetFQMatrixGroups();
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
                renderMetFQMatrixGroups();
                renderMetFQSubsectionPanel();
                renderMetFQProtocolTable();
                renderMetFQTable();
                renderMetFQInSituTable();
            } else if (activeTechId === 'metodologias_bio') {
                ensureMetBioMatrixGroups();
                var allowedBioSubs = getMetBioSubsectionsForMatrix(getActiveMetBioMatrixValue()).map(function(sub) { return sub.id; });
                if (activeMetBioSubsection && allowedBioSubs.indexOf(activeMetBioSubsection) === -1) {
                    activeMetBioSubsection = '';
                }
                if (metBioFields) metBioFields.style.display = '';
                var bioCfgLoad = getActiveMetBioProtocolConfig();
                setQuillHTML('techEditorMetBioProtocolo', draft[bioCfgLoad.intro] || '');
                setQuillHTML('techEditorMetBioProtocoloDesc', draft[bioCfgLoad.descripcion] || '');
                var bioProtocolImgPreview = document.getElementById('techMetBioProtocolImgPreview');
                var bioProtocolImgUpload = document.getElementById('techMetBioProtocolImgUpload');
                var bioProtocolImgTag = document.getElementById('techMetBioProtocolImgTag');
                if (draft[bioCfgLoad.imagen]) {
                    if (bioProtocolImgTag) bioProtocolImgTag.src = draft[bioCfgLoad.imagen];
                    if (bioProtocolImgPreview) bioProtocolImgPreview.style.display = '';
                    if (bioProtocolImgUpload) bioProtocolImgUpload.style.display = 'none';
                } else {
                    if (bioProtocolImgPreview) bioProtocolImgPreview.style.display = 'none';
                    if (bioProtocolImgUpload) bioProtocolImgUpload.style.display = '';
                }
                setQuillHTML('techEditorMetBioEspecificacionesDesc', draft.especificaciones_descripcion || '');
                var fitoMatrixWrap = document.getElementById('techMetBioFitoplanctonMatrixWrap');
                var zooIctioMatrixWrap = document.getElementById('techMetBioZooIctioMatrixWrap');
                var censoMatrixWrap = document.getElementById('techMetBioCensoMatrixWrap');
                var activeBioMatrix = getActiveMetBioMatrixValue();
                var isFitoSpecs = (activeBioMatrix === 'FITOPLANCTON' && activeMetBioSubsection === 'especificaciones');
                var isZooIctioSpecs = ((activeBioMatrix === 'ZOOPLANCTON' || activeBioMatrix === 'ICTIOPLANCTON') && activeMetBioSubsection === 'especificaciones');
                var isCensoSpecs = (activeBioMatrix === 'CENSO_AVES_MAM_REP' && activeMetBioSubsection === 'especificaciones');
                if (fitoMatrixWrap) fitoMatrixWrap.style.display = isFitoSpecs ? '' : 'none';
                if (zooIctioMatrixWrap) zooIctioMatrixWrap.style.display = isZooIctioSpecs ? '' : 'none';
                if (censoMatrixWrap) censoMatrixWrap.style.display = isCensoSpecs ? '' : 'none';
                var fitoCualitativo = document.getElementById('techMetBioFitoCualitativo');
                var fitoCuantitativo = document.getElementById('techMetBioFitoCuantitativo');
                if (fitoCualitativo) fitoCualitativo.checked = !!draft.fitoplancton_cualitativo;
                if (fitoCuantitativo) fitoCuantitativo.checked = !!draft.fitoplancton_cuantitativo;
                var zooIctioVertDiurno = document.getElementById('techMetBioZooIctioVertDiurno');
                var zooIctioVertNocturno = document.getElementById('techMetBioZooIctioVertNocturno');
                var zooIctioHorDiurno = document.getElementById('techMetBioZooIctioHorDiurno');
                var zooIctioHorNocturno = document.getElementById('techMetBioZooIctioHorNocturno');
                if (zooIctioVertDiurno) zooIctioVertDiurno.checked = !!draft.zoo_ictio_vertical_diurno;
                if (zooIctioVertNocturno) zooIctioVertNocturno.checked = !!draft.zoo_ictio_vertical_nocturno;
                if (zooIctioHorDiurno) zooIctioHorDiurno.checked = !!draft.zoo_ictio_horizontal_diurno;
                if (zooIctioHorNocturno) zooIctioHorNocturno.checked = !!draft.zoo_ictio_horizontal_nocturno;
                var censoMarDiurno = document.getElementById('techMetBioCensoMarDiurno');
                var censoMarNocturno = document.getElementById('techMetBioCensoMarNocturno');
                var censoTierraDiurno = document.getElementById('techMetBioCensoTierraDiurno');
                var censoTierraNocturno = document.getElementById('techMetBioCensoTierraNocturno');
                if (censoMarDiurno) censoMarDiurno.checked = !!draft.censo_mar_diurno;
                if (censoMarNocturno) censoMarNocturno.checked = !!draft.censo_mar_nocturno;
                if (censoTierraDiurno) censoTierraDiurno.checked = !!draft.censo_tierra_diurno;
                if (censoTierraNocturno) censoTierraNocturno.checked = !!draft.censo_tierra_nocturno;
                renderMetBioMatrixGroups();
                renderMetBioSubsectionPanel();
                renderMetBioProtocolTable();
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

            // Renderizar campos extra de secciones de plantilla
            if (section && !section.isCustom && (section.extraFields || []).length > 0) {
                if (extraFieldsContainer) extraFieldsContainer.style.display = '';
                if (extraFieldsEl) {
                    extraFieldsEl.innerHTML = section.extraFields.map(function(field, idx) {
                        return '<div class="tech-editor-row">' +
                            '<label>' + escapeHtml(field) + '</label>' +
                            '<div class="quill-editor" id="techExtraQuill_' + idx + '" data-extra-field="' + escapeHtml(field) + '"></div>' +
                        '</div>';
                    }).join('');
                    section.extraFields.forEach(function(field, idx) {
                        var editorId = 'techExtraQuill_' + idx;
                        var value = (draft.extraFields && draft.extraFields[field]) ? draft.extraFields[field] : '';
                        var quill = initQuillEditor(editorId, '', 3);
                        if (quill && value) setQuillHTML(editorId, value);
                        if (quill) {
                            quill.on('text-change', function(delta, oldDelta, source) {
                                if (suppressQuillSync || source !== 'user') return;
                                if (!techDrafts[activeTechId].extraFields) techDrafts[activeTechId].extraFields = {};
                                techDrafts[activeTechId].extraFields[field] = getQuillHTML(editorId);
                                updateTechStatus('Cambios sin guardar');
                                renderTechDocFull();
                            });
                        }
                    });
                }
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
                ['techEditorMetFQInSituFinal', 'Texto final para parámetros medidos in situ', 4],
                ['techEditorMetBioProtocolo', 'Describe el protocolo de muestreo biológico', 4],
                ['techEditorMetBioProtocoloDesc', 'Descripción del protocolo de muestreo biológico', 4],
                ['techEditorMetBioEspecificacionesDesc', 'Descripción de especificaciones por matriz', 4]
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
            var fitoCualitativo = document.getElementById('techMetBioFitoCualitativo');
            var fitoCuantitativo = document.getElementById('techMetBioFitoCuantitativo');
            if (fitoCualitativo) fitoCualitativo.addEventListener('change', function() { syncActiveDraft(true); });
            if (fitoCuantitativo) fitoCuantitativo.addEventListener('change', function() { syncActiveDraft(true); });
            var zooIctioVertDiurno = document.getElementById('techMetBioZooIctioVertDiurno');
            var zooIctioVertNocturno = document.getElementById('techMetBioZooIctioVertNocturno');
            var zooIctioHorDiurno = document.getElementById('techMetBioZooIctioHorDiurno');
            var zooIctioHorNocturno = document.getElementById('techMetBioZooIctioHorNocturno');
            var censoMarDiurno = document.getElementById('techMetBioCensoMarDiurno');
            var censoMarNocturno = document.getElementById('techMetBioCensoMarNocturno');
            var censoTierraDiurno = document.getElementById('techMetBioCensoTierraDiurno');
            var censoTierraNocturno = document.getElementById('techMetBioCensoTierraNocturno');
            if (zooIctioVertDiurno) zooIctioVertDiurno.addEventListener('change', function() { syncActiveDraft(true); });
            if (zooIctioVertNocturno) zooIctioVertNocturno.addEventListener('change', function() { syncActiveDraft(true); });
            if (zooIctioHorDiurno) zooIctioHorDiurno.addEventListener('change', function() { syncActiveDraft(true); });
            if (zooIctioHorNocturno) zooIctioHorNocturno.addEventListener('change', function() { syncActiveDraft(true); });
            if (censoMarDiurno) censoMarDiurno.addEventListener('change', function() { syncActiveDraft(true); });
            if (censoMarNocturno) censoMarNocturno.addEventListener('change', function() { syncActiveDraft(true); });
            if (censoTierraDiurno) censoTierraDiurno.addEventListener('change', function() { syncActiveDraft(true); });
            if (censoTierraNocturno) censoTierraNocturno.addEventListener('change', function() { syncActiveDraft(true); });

            var techFQAddPointBtn = document.getElementById('techFQAddPointBtn');
            var techFQToggleAddPointBtn = document.getElementById('techFQToggleAddPointBtn');
            var techFQCancelAddPointBtn = document.getElementById('techFQCancelAddPointBtn');
            var techFQAddPointForm = document.getElementById('techFQAddPointForm');

            function setFQAddPointFormOpen(isOpen) {
                if (techFQAddPointForm) techFQAddPointForm.style.display = isOpen ? '' : 'none';
                if (techFQToggleAddPointBtn) techFQToggleAddPointBtn.style.display = isOpen ? 'none' : '';
            }

            setFQAddPointFormOpen(false);

            if (techFQToggleAddPointBtn && techFQAddPointForm) {
                techFQToggleAddPointBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    setFQAddPointFormOpen(true);
                    var firstInput = document.getElementById('techFQNewNombre');
                    if (firstInput) firstInput.focus();
                });
            }
            if (techFQCancelAddPointBtn && techFQAddPointForm) {
                techFQCancelAddPointBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    ['techFQNewNombre', 'techFQNewLugar', 'techFQNewLatitud', 'techFQNewLongitud', 'techFQNewDatum'].forEach(function(id) {
                        var el = document.getElementById(id);
                        if (el) el.value = '';
                    });
                    var newEstratosEl = document.getElementById('techFQNewEstratos');
                    var newReplicasEl = document.getElementById('techFQNewReplicas');
                    if (newEstratosEl) newEstratosEl.value = '1';
                    if (newReplicasEl) newReplicasEl.value = '1';
                    setFQAddPointFormOpen(false);
                });
            }
            var techMetFQMatrixSelect = document.getElementById('techMetFQMatrixSelect');
            var techMetFQMatrixAddBtn = document.getElementById('techMetFQMatrixAddBtn');
            if (techMetFQMatrixAddBtn) {
                techMetFQMatrixAddBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (!techMetFQMatrixSelect) return;
                    ensureMetFQMatrixGroups();
                    syncActiveDraft(true);
                    var draft = techDrafts.metodologias_fq;
                    var matrixValue = techMetFQMatrixSelect.value || 'AGUA_MAR_E';
                    var existing = (draft.matrix_groups || []).find(function(g) { return g.matriz === matrixValue; });
                    if (existing) {
                        activeMetFQMatrixId = existing.id;
                        activeMetFQSubsection = '';
                        draft.active_matrix_id = existing.id;
                        applyMetFQGroupToRoot(existing, draft);
                        buildTechTree();
                        selectTechItem('metodologias_fq', { skipSyncCurrent: true });
                        return;
                    }
                    var newId = 'matrix_' + Date.now();
                    draft.matrix_groups.push({
                        id: newId,
                        matriz: matrixValue,
                        protocolo_intro: '',
                        protocolo_puntos: [],
                        protocolo_imagen: '',
                        protocolo_imagen_name: '',
                        protocolo_descripcion: '',
                        selectedParams: [],
                        params_intro: '',
                        texto_final: '',
                        in_situ_intro: '',
                        in_situ_selected: [],
                        in_situ_final: '',
                        updatedAt: ''
                    });
                    activeMetFQMatrixId = newId;
                    activeMetFQSubsection = '';
                    draft.active_matrix_id = newId;
                    applyMetFQGroupToRoot(draft.matrix_groups[draft.matrix_groups.length - 1], draft);
                    draft.dirty = true;
                    updateTechStatus('Cambios sin guardar');
                    buildTechTree();
                    selectTechItem('metodologias_fq', { skipSyncCurrent: true });
                });
            }
            if (techFQAddPointBtn) {
                techFQAddPointBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var nombre = (document.getElementById('techFQNewNombre') || {}).value || '';
                    var lugar = (document.getElementById('techFQNewLugar') || {}).value || '';
                    var matriz = getMetFQMatrixLabel(getActiveMetFQMatrixValue());
                    var latitud = (document.getElementById('techFQNewLatitud') || {}).value || '';
                    var longitud = (document.getElementById('techFQNewLongitud') || {}).value || '';
                    var datum = (document.getElementById('techFQNewDatum') || {}).value || '';
                    var estratos = Math.max(1, parseInt((document.getElementById('techFQNewEstratos') || {}).value, 10) || 1);
                    var replicas = Math.max(1, parseInt((document.getElementById('techFQNewReplicas') || {}).value, 10) || 1);
                    var muestras = estratos * replicas;
                    if (!nombre.trim() && !lugar.trim()) return;
                    if (!techDrafts.metodologias_fq.protocolo_puntos) techDrafts.metodologias_fq.protocolo_puntos = [];
                    techDrafts.metodologias_fq.protocolo_puntos.push({ nombre: nombre.trim(), lugar: lugar.trim(), matriz: matriz, latitud: latitud.trim(), longitud: longitud.trim(), datum: datum.trim(), estratos: estratos, replicas: replicas, muestras: muestras });
                    techDrafts.metodologias_fq.dirty = true;
                    updateTechStatus('Cambios sin guardar');
                    ['techFQNewNombre', 'techFQNewLugar', 'techFQNewLatitud', 'techFQNewLongitud', 'techFQNewDatum'].forEach(function(id) {
                        var el = document.getElementById(id);
                        if (el) el.value = '';
                    });
                    var newEstratosEl = document.getElementById('techFQNewEstratos');
                    var newReplicasEl = document.getElementById('techFQNewReplicas');
                    if (newEstratosEl) newEstratosEl.value = '1';
                    if (newReplicasEl) newReplicasEl.value = '1';
                    var firstInput = document.getElementById('techFQNewNombre');
                    if (firstInput) firstInput.focus();
                    renderMetFQProtocolTable();
                    renderTechDocView();
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

            var techBioAddPointBtn = document.getElementById('techBioAddPointBtn');
            var techBioToggleAddPointBtn = document.getElementById('techBioToggleAddPointBtn');
            var techBioCancelAddPointBtn = document.getElementById('techBioCancelAddPointBtn');
            var techBioAddPointForm = document.getElementById('techBioAddPointForm');

            function setBioAddPointFormOpen(isOpen) {
                if (techBioAddPointForm) techBioAddPointForm.style.display = isOpen ? '' : 'none';
                if (techBioToggleAddPointBtn) techBioToggleAddPointBtn.style.display = isOpen ? 'none' : '';
            }

            setBioAddPointFormOpen(false);

            if (techBioToggleAddPointBtn && techBioAddPointForm) {
                techBioToggleAddPointBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    setBioAddPointFormOpen(true);
                    var firstInput = document.getElementById('techBioNewNombre');
                    if (firstInput) firstInput.focus();
                });
            }
            if (techBioCancelAddPointBtn && techBioAddPointForm) {
                techBioCancelAddPointBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    ['techBioNewNombre', 'techBioNewLugar', 'techBioNewLatitud', 'techBioNewLongitud', 'techBioNewDatum'].forEach(function(id) {
                        var el = document.getElementById(id);
                        if (el) el.value = '';
                    });
                    var newEstratosEl = document.getElementById('techBioNewEstratos');
                    var newReplicasEl = document.getElementById('techBioNewReplicas');
                    if (newEstratosEl) newEstratosEl.value = '1';
                    if (newReplicasEl) newReplicasEl.value = '1';
                    setBioAddPointFormOpen(false);
                });
            }
            var techMetBioMatrixSelect = document.getElementById('techMetBioMatrixSelect');
            var techMetBioMatrixAddBtn = document.getElementById('techMetBioMatrixAddBtn');
            if (techMetBioMatrixAddBtn) {
                techMetBioMatrixAddBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (!techMetBioMatrixSelect) return;
                    ensureMetBioMatrixGroups();
                    syncActiveDraft(true);
                    var draft = techDrafts.metodologias_bio;
                    var matrixValue = techMetBioMatrixSelect.value || 'FITOPLANCTON';
                    var existing = (draft.matrix_groups || []).find(function(g) { return g.matriz === matrixValue; });
                    if (existing) {
                        activeMetBioMatrixId = existing.id;
                        activeMetBioSubsection = '';
                        draft.active_matrix_id = existing.id;
                        applyMetBioGroupToRoot(existing, draft);
                        buildTechTree();
                        selectTechItem('metodologias_bio', { skipSyncCurrent: true });
                        return;
                    }
                    var newId = 'matrix_bio_' + Date.now();
                    draft.matrix_groups.push({
                        id: newId,
                        matriz: matrixValue,
                        protocolo_intro: '',
                        protocolo_puntos: [],
                        protocolo_imagen: '',
                        protocolo_imagen_name: '',
                        protocolo_descripcion: '',
                        transectas_intro: '',
                        transectas_puntos: [],
                        transectas_imagen: '',
                        transectas_imagen_name: '',
                        transectas_descripcion: '',
                        especificaciones_texto: '',
                        especificaciones_descripcion: '',
                        fitoplancton_cualitativo: false,
                        fitoplancton_cuantitativo: false,
                        zoo_ictio_vertical_diurno: false,
                        zoo_ictio_vertical_nocturno: false,
                        zoo_ictio_horizontal_diurno: false,
                        zoo_ictio_horizontal_nocturno: false,
                        censo_mar_diurno: false,
                        censo_mar_nocturno: false,
                        censo_tierra_diurno: false,
                        censo_tierra_nocturno: false,
                        updatedAt: ''
                    });
                    activeMetBioMatrixId = newId;
                    activeMetBioSubsection = '';
                    draft.active_matrix_id = newId;
                    applyMetBioGroupToRoot(draft.matrix_groups[draft.matrix_groups.length - 1], draft);
                    draft.dirty = true;
                    updateTechStatus('Cambios sin guardar');
                    buildTechTree();
                    selectTechItem('metodologias_bio', { skipSyncCurrent: true });
                });
            }
            if (techBioAddPointBtn) {
                techBioAddPointBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var nombre = (document.getElementById('techBioNewNombre') || {}).value || '';
                    var lugar = (document.getElementById('techBioNewLugar') || {}).value || '';
                    var matriz = getMetBioMatrixLabel(getActiveMetBioMatrixValue());
                    var latitud = (document.getElementById('techBioNewLatitud') || {}).value || '';
                    var longitud = (document.getElementById('techBioNewLongitud') || {}).value || '';
                    var datum = (document.getElementById('techBioNewDatum') || {}).value || '';
                    var estratos = Math.max(1, parseInt((document.getElementById('techBioNewEstratos') || {}).value, 10) || 1);
                    var replicas = Math.max(1, parseInt((document.getElementById('techBioNewReplicas') || {}).value, 10) || 1);
                    var muestras = estratos * replicas;
                    var bioCfg = getActiveMetBioProtocolConfig();
                    if (!nombre.trim() && !lugar.trim()) return;
                    if (!techDrafts.metodologias_bio[bioCfg.puntos]) techDrafts.metodologias_bio[bioCfg.puntos] = [];
                    techDrafts.metodologias_bio[bioCfg.puntos].push({ nombre: nombre.trim(), lugar: lugar.trim(), matriz: matriz, latitud: latitud.trim(), longitud: longitud.trim(), datum: datum.trim(), estratos: estratos, replicas: replicas, muestras: muestras });
                    techDrafts.metodologias_bio.dirty = true;
                    syncRootToActiveMetBioGroup();
                    updateTechStatus('Cambios sin guardar');
                    ['techBioNewNombre', 'techBioNewLugar', 'techBioNewLatitud', 'techBioNewLongitud', 'techBioNewDatum'].forEach(function(id) {
                        var el = document.getElementById(id);
                        if (el) el.value = '';
                    });
                    var newEstratosEl = document.getElementById('techBioNewEstratos');
                    var newReplicasEl = document.getElementById('techBioNewReplicas');
                    if (newEstratosEl) newEstratosEl.value = '1';
                    if (newReplicasEl) newReplicasEl.value = '1';
                    var firstInput = document.getElementById('techBioNewNombre');
                    if (firstInput) firstInput.focus();
                    renderMetBioProtocolTable();
                    renderTechDocView();
                });
            }

            var bioProtocolImgUploadDiv = document.getElementById('techMetBioProtocolImgUpload');
            var bioProtocolImgFileInput = document.getElementById('techMetBioProtocolImgInput');
            var bioProtocolImgRemoveBtn = document.getElementById('techMetBioProtocolImgRemove');
            if (bioProtocolImgUploadDiv && bioProtocolImgFileInput) {
                bioProtocolImgUploadDiv.addEventListener('click', function() { bioProtocolImgFileInput.click(); });
                bioProtocolImgFileInput.addEventListener('change', function() {
                    var file = this.files && this.files[0];
                    if (!file) return;
                    var bioCfg = getActiveMetBioProtocolConfig();
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        techDrafts.metodologias_bio[bioCfg.imagen] = e.target.result;
                        techDrafts.metodologias_bio[bioCfg.imagen_name] = file.name;
                        techDrafts.metodologias_bio.dirty = true;
                        syncRootToActiveMetBioGroup();
                        updateTechStatus('Cambios sin guardar');
                        var tag = document.getElementById('techMetBioProtocolImgTag');
                        var prev = document.getElementById('techMetBioProtocolImgPreview');
                        if (tag) tag.src = e.target.result;
                        if (prev) prev.style.display = '';
                        bioProtocolImgUploadDiv.style.display = 'none';
                        renderTechDocView();
                        renderTechDocFull();
                    };
                    reader.readAsDataURL(file);
                });
            }
            if (bioProtocolImgRemoveBtn) {
                bioProtocolImgRemoveBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var bioCfg = getActiveMetBioProtocolConfig();
                    techDrafts.metodologias_bio[bioCfg.imagen] = '';
                    techDrafts.metodologias_bio[bioCfg.imagen_name] = '';
                    techDrafts.metodologias_bio.dirty = true;
                    syncRootToActiveMetBioGroup();
                    updateTechStatus('Cambios sin guardar');
                    var prev = document.getElementById('techMetBioProtocolImgPreview');
                    if (prev) prev.style.display = 'none';
                    if (bioProtocolImgUploadDiv) bioProtocolImgUploadDiv.style.display = '';
                    if (bioProtocolImgFileInput) bioProtocolImgFileInput.value = '';
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
                var selected = techDrafts.metodologias_fq ? (techDrafts.metodologias_fq.selectedParams || []).map(normalizeLabSelectedItem) : [];
                var items = syncSharedLabCatalogFromCotizacion();
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
                    var checked = selected.some(function(sel) { return sel.parametro === item.parametro && (sel.metodologia || '') === (item.metodologia || ''); }) ? ' checked' : '';
                    return '<label class="simple-modal-item">' +
                        '<input type="checkbox" data-modal-fq-param="' + idx + '"' + checked + '>' +
                        '<span><strong>' + item.parametro + '</strong><br>' + (item.metodologia || '—') + '</span>' +
                    '</label>';
                }).join('');

                fqModalList.querySelectorAll('input[type="checkbox"]').forEach(function(box) {
                    box.addEventListener('change', function() {
                        var index = parseInt(this.getAttribute('data-modal-fq-param'), 10);
                        if (isNaN(index)) return;
                        var param = items[index];
                        var pos = selected.findIndex(function(sel) { return sel.parametro === param.parametro && (sel.metodologia || '') === (param.metodologia || ''); });
                        if (this.checked && pos === -1) {
                            selected.push(normalizeLabSelectedItem(param));
                        }
                        if (!this.checked && pos !== -1) selected.splice(pos, 1);
                        techDrafts.metodologias_fq.selectedParams = selected;
                        techDrafts.metodologias_fq.dirty = true;
                        syncRootToActiveMetFQGroup();
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
                var selected = techDrafts.metodologias_fq ? (techDrafts.metodologias_fq.in_situ_selected || []).map(normalizeFieldSelectedItem) : [];
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
                    var checked = selected.some(function(sel) { return sel.parametro === item.parametro && (sel.metodo || '') === (item.metodo || ''); }) ? ' checked' : '';
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
                        var pos = selected.findIndex(function(sel) { return sel.parametro === item.parametro && (sel.metodo || '') === (item.metodo || ''); });
                        if (this.checked && pos === -1) {
                            selected.push(normalizeFieldSelectedItem({
                                parametro: item.parametro,
                                metodo: item.metodo,
                                afectaETFA: '',
                                etfaCode: generarCodigoEtfa(item.parametro, 1000000),
                                matriz: '',
                                instrumento: ''
                            }));
                        }
                        if (!this.checked && pos !== -1) selected.splice(pos, 1);
                        techDrafts.metodologias_fq.in_situ_selected = selected;
                        techDrafts.metodologias_fq.dirty = true;
                        syncRootToActiveMetFQGroup();
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
