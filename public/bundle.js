
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function create_slot(definition, ctx, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, fn) {
        return definition[1]
            ? assign({}, assign(ctx.$$scope.ctx, definition[1](fn ? fn(ctx) : {})))
            : ctx.$$scope.ctx;
    }
    function get_slot_changes(definition, ctx, changed, fn) {
        return definition[1]
            ? assign({}, assign(ctx.$$scope.changed || {}, definition[1](fn ? fn(changed) : {})))
            : ctx.$$scope.changed || {};
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? undefined : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function createEventDispatcher() {
        const component = current_component;
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
                return ret;
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev("SvelteDOMSetProperty", { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src/components/Header.svelte generated by Svelte v3.12.1 */

    const file = "src/components/Header.svelte";

    function create_fragment(ctx) {
    	var nav, h1, t_1, div, sub;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			h1 = element("h1");
    			h1.textContent = "VIRTUAL MENU";
    			t_1 = space();
    			div = element("div");
    			sub = element("sub");
    			sub.textContent = "Administration";
    			attr_dev(h1, "class", "center svelte-xtxktv");
    			add_location(h1, file, 14, 2, 200);
    			add_location(sub, file, 17, 4, 271);
    			attr_dev(div, "class", "centralizado");
    			add_location(div, file, 16, 2, 240);
    			attr_dev(nav, "id", "header");
    			attr_dev(nav, "class", "svelte-xtxktv");
    			add_location(nav, file, 13, 0, 180);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, h1);
    			append_dev(nav, t_1);
    			append_dev(nav, div);
    			append_dev(div, sub);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(nav);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment.name, type: "component", source: "", ctx });
    	return block;
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Header", options, id: create_fragment.name });
    	}
    }

    const apiUrl = 'https://virtual-menu-server.herokuapp.com/';
    let baseURL = apiUrl;

    const post = (url, data) => {
        let options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json' },
            mode: 'cors',
            cache: 'default'
        };

        return fetch(url, options)
            .then((response) => {
                return response.json();
            })
            .then((obj) => {
                console.log('-- response POST:' + url);
                console.table(obj);
                return obj;
            });
    };

    const put = (url, data) => {
        let options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json' },
            mode: 'cors',
            cache: 'default'
        };

        return fetch(url, options)
            .then((response) => {
                return response.json();
            })
            .then((obj) => {
                console.log('-- response POST:' + url);
                console.table(obj);
                return obj;
            });
    };

    const get = (url) => {
        let options = {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
            mode: 'cors',
            cache: 'default'
        };

        return fetch(url, options)
            .then((response) => {
                return response.json();
            })
            .then((obj) => {
                return obj;
            });
    };

    const remove = (url) => {
        let options = {
            method: 'DELETE'
        };

        return fetch(url, options)
            .then((response) => {
                return response;
            })
            .then((obj) => {
                return obj;
            });
    };

    const save = (url, obj) => {
        return post(baseURL + url, obj);
    };

    const update$1 = (url, obj) => {
        return put(baseURL + url, obj);
    };

    const getAll = (url) => {
        return get(baseURL + url);
    };

    const remove$1 = (url, id) => {
        const urlRemove = baseURL + url + id;
        return remove(urlRemove);
    };

    /* src/components/Modal.svelte generated by Svelte v3.12.1 */

    const file$1 = "src/components/Modal.svelte";

    const get_content_slot_changes = () => ({});
    const get_content_slot_context = () => ({});

    const get_title_slot_changes = () => ({});
    const get_title_slot_context = () => ({});

    function create_fragment$1(ctx) {
    	var div4, div3, div2, div0, button, i, t0, t1, div1, div4_class_value, current, dispose;

    	const title_slot_template = ctx.$$slots.title;
    	const title_slot = create_slot(title_slot_template, ctx, get_title_slot_context);

    	const content_slot_template = ctx.$$slots.content;
    	const content_slot = create_slot(content_slot_template, ctx, get_content_slot_context);

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			button = element("button");
    			i = element("i");
    			t0 = space();

    			if (title_slot) title_slot.c();
    			t1 = space();
    			div1 = element("div");

    			if (content_slot) content_slot.c();
    			attr_dev(i, "class", "fa fa-close");
    			add_location(i, file$1, 75, 10, 1433);
    			attr_dev(button, "class", "btn-close svelte-1hk5sf0");
    			add_location(button, file$1, 74, 8, 1376);

    			attr_dev(div0, "class", "card-header svelte-1hk5sf0");
    			add_location(div0, file$1, 73, 6, 1342);

    			attr_dev(div1, "class", "card-content svelte-1hk5sf0");
    			add_location(div1, file$1, 79, 6, 1526);
    			attr_dev(div2, "class", "card svelte-1hk5sf0");
    			add_location(div2, file$1, 72, 4, 1317);
    			attr_dev(div3, "class", "pelicula centralizado svelte-1hk5sf0");
    			add_location(div3, file$1, 71, 2, 1277);
    			attr_dev(div4, "class", div4_class_value = "" + null_to_empty((ctx.open ? 'modal open' : 'modal')) + " svelte-1hk5sf0");
    			add_location(div4, file$1, 70, 0, 1231);
    			dispose = listen_dev(button, "click", ctx.hideForm);
    		},

    		l: function claim(nodes) {
    			if (title_slot) title_slot.l(div0_nodes);

    			if (content_slot) content_slot.l(div1_nodes);
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, button);
    			append_dev(button, i);
    			append_dev(div0, t0);

    			if (title_slot) {
    				title_slot.m(div0, null);
    			}

    			append_dev(div2, t1);
    			append_dev(div2, div1);

    			if (content_slot) {
    				content_slot.m(div1, null);
    			}

    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (title_slot && title_slot.p && changed.$$scope) {
    				title_slot.p(
    					get_slot_changes(title_slot_template, ctx, changed, get_title_slot_changes),
    					get_slot_context(title_slot_template, ctx, get_title_slot_context)
    				);
    			}

    			if (content_slot && content_slot.p && changed.$$scope) {
    				content_slot.p(
    					get_slot_changes(content_slot_template, ctx, changed, get_content_slot_changes),
    					get_slot_context(content_slot_template, ctx, get_content_slot_context)
    				);
    			}

    			if ((!current || changed.open) && div4_class_value !== (div4_class_value = "" + null_to_empty((ctx.open ? 'modal open' : 'modal')) + " svelte-1hk5sf0")) {
    				attr_dev(div4, "class", div4_class_value);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(title_slot, local);
    			transition_in(content_slot, local);
    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(title_slot, local);
    			transition_out(content_slot, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div4);
    			}

    			if (title_slot) title_slot.d(detaching);

    			if (content_slot) content_slot.d(detaching);
    			dispose();
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$1.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { open = false } = $$props;
      const dispatch = createEventDispatcher();

      const hideForm = () => {
        dispatch("hide");
      };

    	const writable_props = ['open'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Modal> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ('open' in $$props) $$invalidate('open', open = $$props.open);
    		if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return { open };
    	};

    	$$self.$inject_state = $$props => {
    		if ('open' in $$props) $$invalidate('open', open = $$props.open);
    	};

    	return { open, hideForm, $$slots, $$scope };
    }

    class Modal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment$1, safe_not_equal, ["open"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Modal", options, id: create_fragment$1.name });
    	}

    	get open() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/table/TableForm.svelte generated by Svelte v3.12.1 */

    const file$2 = "src/table/TableForm.svelte";

    function create_fragment$2(ctx) {
    	var form, div1, div0, label, t1, input, input_updating = false, t2, div2, button0, t4, button1, t5, dispose;

    	function input_input_handler() {
    		input_updating = true;
    		ctx.input_input_handler.call(input);
    	}

    	const block = {
    		c: function create() {
    			form = element("form");
    			div1 = element("div");
    			div0 = element("div");
    			label = element("label");
    			label.textContent = "Número:";
    			t1 = space();
    			input = element("input");
    			t2 = space();
    			div2 = element("div");
    			button0 = element("button");
    			button0.textContent = "Cancelar";
    			t4 = space();
    			button1 = element("button");
    			t5 = text("Salvar");
    			add_location(label, file$2, 73, 6, 1586);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "1");
    			input.required = true;
    			attr_dev(input, "class", "svelte-1u3cb8y");
    			add_location(input, file$2, 74, 6, 1615);
    			attr_dev(div0, "class", "input-area svelte-1u3cb8y");
    			add_location(div0, file$2, 72, 4, 1555);
    			attr_dev(div1, "class", "row-line svelte-1u3cb8y");
    			add_location(div1, file$2, 71, 2, 1528);
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "btn warn svelte-1u3cb8y");
    			add_location(button0, file$2, 84, 4, 1806);
    			attr_dev(button1, "type", "submit");
    			attr_dev(button1, "class", "btn success svelte-1u3cb8y");
    			button1.disabled = ctx.mustDisable;
    			add_location(button1, file$2, 85, 4, 1887);
    			attr_dev(div2, "class", "actions row-line svelte-1u3cb8y");
    			add_location(div2, file$2, 83, 2, 1771);
    			attr_dev(form, "class", "svelte-1u3cb8y");
    			add_location(form, file$2, 70, 0, 1479);

    			dispose = [
    				listen_dev(input, "input", input_input_handler),
    				listen_dev(input, "keydown", ctx.verifyFields),
    				listen_dev(button0, "click", ctx.hideForm),
    				listen_dev(form, "submit", prevent_default(ctx.saveOrUpdate), false, true)
    			];
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);
    			append_dev(form, div1);
    			append_dev(div1, div0);
    			append_dev(div0, label);
    			append_dev(div0, t1);
    			append_dev(div0, input);

    			set_input_value(input, ctx.table.number);

    			append_dev(form, t2);
    			append_dev(form, div2);
    			append_dev(div2, button0);
    			append_dev(div2, t4);
    			append_dev(div2, button1);
    			append_dev(button1, t5);
    		},

    		p: function update(changed, ctx) {
    			if (!input_updating && changed.table) set_input_value(input, ctx.table.number);
    			input_updating = false;

    			if (changed.mustDisable) {
    				prop_dev(button1, "disabled", ctx.mustDisable);
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(form);
    			}

    			run_all(dispose);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$2.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	

      let { table = { id: 0, number: 0, busy: false } } = $$props;
      const dispatch = createEventDispatcher();
      let mustDisable = true;

      const saveOrUpdate = () => {
        if (!table.id || table.id == 0) {
          save("restaurant-tables/", table).then(success => {
            hideForm();
          });
        } else {
          update$1("restaurant-tables/", table).then(success => {
            hideForm();
          });
        }
      };

      const verifyFields = target => {
        $$invalidate('mustDisable', mustDisable = !table.number || table.number < 1);
      };

      const hideForm = () => {
        $$invalidate('table', table = { id: 0, number: 0, busy: false });
        dispatch("hide");
      };

    	const writable_props = ['table'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<TableForm> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		table.number = to_number(this.value);
    		$$invalidate('table', table);
    	}

    	$$self.$set = $$props => {
    		if ('table' in $$props) $$invalidate('table', table = $$props.table);
    	};

    	$$self.$capture_state = () => {
    		return { table, mustDisable };
    	};

    	$$self.$inject_state = $$props => {
    		if ('table' in $$props) $$invalidate('table', table = $$props.table);
    		if ('mustDisable' in $$props) $$invalidate('mustDisable', mustDisable = $$props.mustDisable);
    	};

    	return {
    		table,
    		mustDisable,
    		saveOrUpdate,
    		verifyFields,
    		hideForm,
    		input_input_handler
    	};
    }

    class TableForm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$2, safe_not_equal, ["table"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "TableForm", options, id: create_fragment$2.name });
    	}

    	get table() {
    		throw new Error("<TableForm>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set table(value) {
    		throw new Error("<TableForm>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/table/TableList.svelte generated by Svelte v3.12.1 */

    const file$3 = "src/table/TableList.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.table = list[i];
    	return child_ctx;
    }

    // (67:4) {:else}
    function create_else_block_1(ctx) {
    	var t;

    	const block = {
    		c: function create() {
    			t = text("Edit Table");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_else_block_1.name, type: "else", source: "(67:4) {:else}", ctx });
    	return block;
    }

    // (65:4) {#if !tableToEdit.id || tableToEdit.id == 0}
    function create_if_block(ctx) {
    	var t;

    	const block = {
    		c: function create() {
    			t = text("Create Table");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block.name, type: "if", source: "(65:4) {#if !tableToEdit.id || tableToEdit.id == 0}", ctx });
    	return block;
    }

    // (64:2) <h3 class="center" slot="title">
    function create_title_slot(ctx) {
    	var h3;

    	function select_block_type(changed, ctx) {
    		if (!ctx.tableToEdit.id || ctx.tableToEdit.id == 0) return create_if_block;
    		return create_else_block_1;
    	}

    	var current_block_type = select_block_type(null, ctx);
    	var if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			if_block.c();
    			attr_dev(h3, "class", "center");
    			attr_dev(h3, "slot", "title");
    			add_location(h3, file$3, 63, 2, 1133);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			if_block.m(h3, null);
    		},

    		p: function update(changed, ctx) {
    			if (current_block_type !== (current_block_type = select_block_type(changed, ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);
    				if (if_block) {
    					if_block.c();
    					if_block.m(h3, null);
    				}
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(h3);
    			}

    			if_block.d();
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_title_slot.name, type: "slot", source: "(64:2) <h3 class=\"center\" slot=\"title\">", ctx });
    	return block;
    }

    // (69:2) <div slot="content">
    function create_content_slot(ctx) {
    	var div, current;

    	var tableform = new TableForm({
    		props: { table: ctx.tableToEdit },
    		$$inline: true
    	});
    	tableform.$on("hide", ctx.hideForm);

    	const block = {
    		c: function create() {
    			div = element("div");
    			tableform.$$.fragment.c();
    			attr_dev(div, "slot", "content");
    			add_location(div, file$3, 68, 2, 1271);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(tableform, div, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var tableform_changes = {};
    			if (changed.tableToEdit) tableform_changes.table = ctx.tableToEdit;
    			tableform.$set(tableform_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(tableform.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(tableform.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			destroy_component(tableform);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_content_slot.name, type: "slot", source: "(69:2) <div slot=\"content\">", ctx });
    	return block;
    }

    // (63:0) <Modal open={openModal} on:hide={hideForm}>
    function create_default_slot(ctx) {
    	var t;

    	const block = {
    		c: function create() {
    			t = space();
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_default_slot.name, type: "slot", source: "(63:0) <Modal open={openModal} on:hide={hideForm}>", ctx });
    	return block;
    }

    // (111:6) {:else}
    function create_else_block(ctx) {
    	var h5;

    	const block = {
    		c: function create() {
    			h5 = element("h5");
    			h5.textContent = "No tables yet";
    			attr_dev(h5, "class", "center");
    			add_location(h5, file$3, 111, 8, 2568);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, h5, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(h5);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_else_block.name, type: "else", source: "(111:6) {:else}", ctx });
    	return block;
    }

    // (91:6) {#each tableList as table}
    function create_each_block(ctx) {
    	var div4, div0, t0_value = ctx.table.number + "", t0, t1, div1, t2_value = ctx.table.busy ? 'Busy' : 'Free' + "", t2, t3, div3, div2, button0, i0, t4, button1, i1, t5, dispose;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div3 = element("div");
    			div2 = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t4 = space();
    			button1 = element("button");
    			i1 = element("i");
    			t5 = space();
    			attr_dev(div0, "class", "cell svelte-1i17jk");
    			attr_dev(div0, "data-title", "name");
    			add_location(div0, file$3, 93, 10, 1912);
    			attr_dev(div1, "class", "cell svelte-1i17jk");
    			attr_dev(div1, "data-title", "description");
    			add_location(div1, file$3, 94, 10, 1979);
    			attr_dev(i0, "class", "fa fa-pencil");
    			add_location(i0, file$3, 100, 16, 2261);
    			attr_dev(button0, "class", "btn info");
    			add_location(button0, file$3, 99, 14, 2181);
    			attr_dev(i1, "class", "fa fa-trash");
    			add_location(i1, file$3, 105, 16, 2445);
    			attr_dev(button1, "class", "btn danger");
    			add_location(button1, file$3, 102, 14, 2326);
    			attr_dev(div2, "class", "options");
    			add_location(div2, file$3, 98, 12, 2145);
    			attr_dev(div3, "class", "cell svelte-1i17jk");
    			attr_dev(div3, "data-title", "actions");
    			add_location(div3, file$3, 97, 10, 2093);
    			attr_dev(div4, "class", "row");
    			add_location(div4, file$3, 92, 8, 1884);

    			dispose = [
    				listen_dev(button0, "click", ctx.editItem.bind(this, ctx.table)),
    				listen_dev(button1, "click", ctx.removeItem.bind(this, ctx.table.id))
    			];
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, t0);
    			append_dev(div4, t1);
    			append_dev(div4, div1);
    			append_dev(div1, t2);
    			append_dev(div4, t3);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, button0);
    			append_dev(button0, i0);
    			append_dev(div2, t4);
    			append_dev(div2, button1);
    			append_dev(button1, i1);
    			append_dev(div4, t5);
    		},

    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if ((changed.tableList) && t0_value !== (t0_value = ctx.table.number + "")) {
    				set_data_dev(t0, t0_value);
    			}

    			if ((changed.tableList) && t2_value !== (t2_value = ctx.table.busy ? 'Busy' : 'Free' + "")) {
    				set_data_dev(t2, t2_value);
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div4);
    			}

    			run_all(dispose);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block.name, type: "each", source: "(91:6) {#each tableList as table}", ctx });
    	return block;
    }

    function create_fragment$3(ctx) {
    	var t0, section, div0, h3, t1, t2_value = ctx.tableList.length + "", t2, t3, t4, button, i, t5, div6, div4, div1, t7, div2, t9, div3, t11, div5, current, dispose;

    	var modal = new Modal({
    		props: {
    		open: ctx.openModal,
    		$$slots: {
    		default: [create_default_slot],
    		content: [create_content_slot],
    		title: [create_title_slot]
    	},
    		$$scope: { ctx }
    	},
    		$$inline: true
    	});
    	modal.$on("hide", ctx.hideForm);

    	let each_value = ctx.tableList;

    	let each_blocks = [];

    	for (let i_1 = 0; i_1 < each_value.length; i_1 += 1) {
    		each_blocks[i_1] = create_each_block(get_each_context(ctx, each_value, i_1));
    	}

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block(ctx);
    		each_1_else.c();
    	}

    	const block = {
    		c: function create() {
    			modal.$$.fragment.c();
    			t0 = space();
    			section = element("section");
    			div0 = element("div");
    			h3 = element("h3");
    			t1 = text("Restaurant Tables (");
    			t2 = text(t2_value);
    			t3 = text(")");
    			t4 = space();
    			button = element("button");
    			i = element("i");
    			t5 = space();
    			div6 = element("div");
    			div4 = element("div");
    			div1 = element("div");
    			div1.textContent = "Number";
    			t7 = space();
    			div2 = element("div");
    			div2.textContent = "Status";
    			t9 = space();
    			div3 = element("div");
    			div3.textContent = "Actions";
    			t11 = space();
    			div5 = element("div");

    			for (let i_1 = 0; i_1 < each_blocks.length; i_1 += 1) {
    				each_blocks[i_1].c();
    			}
    			add_location(h3, file$3, 75, 4, 1448);
    			attr_dev(i, "class", "fa fa-plus");
    			add_location(i, file$3, 77, 6, 1557);
    			attr_dev(button, "class", "btn success");
    			add_location(button, file$3, 76, 4, 1500);
    			attr_dev(div0, "class", "header space-between");
    			add_location(div0, file$3, 74, 2, 1409);
    			attr_dev(div1, "class", "cell svelte-1i17jk");
    			add_location(div1, file$3, 84, 6, 1664);
    			attr_dev(div2, "class", "cell svelte-1i17jk");
    			add_location(div2, file$3, 85, 6, 1701);
    			attr_dev(div3, "class", "cell svelte-1i17jk");
    			add_location(div3, file$3, 86, 6, 1738);
    			attr_dev(div4, "class", "row header");
    			add_location(div4, file$3, 83, 4, 1633);
    			attr_dev(div5, "class", "list-content svelte-1i17jk");
    			add_location(div5, file$3, 89, 4, 1786);
    			attr_dev(div6, "class", "table");
    			add_location(div6, file$3, 81, 2, 1608);
    			attr_dev(section, "id", "table-list");
    			attr_dev(section, "class", "card svelte-1i17jk");
    			add_location(section, file$3, 73, 0, 1368);
    			dispose = listen_dev(button, "click", ctx.createItem);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(modal, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, h3);
    			append_dev(h3, t1);
    			append_dev(h3, t2);
    			append_dev(h3, t3);
    			append_dev(div0, t4);
    			append_dev(div0, button);
    			append_dev(button, i);
    			append_dev(section, t5);
    			append_dev(section, div6);
    			append_dev(div6, div4);
    			append_dev(div4, div1);
    			append_dev(div4, t7);
    			append_dev(div4, div2);
    			append_dev(div4, t9);
    			append_dev(div4, div3);
    			append_dev(div6, t11);
    			append_dev(div6, div5);

    			for (let i_1 = 0; i_1 < each_blocks.length; i_1 += 1) {
    				each_blocks[i_1].m(div5, null);
    			}

    			if (each_1_else) {
    				each_1_else.m(div5, null);
    			}

    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var modal_changes = {};
    			if (changed.openModal) modal_changes.open = ctx.openModal;
    			if (changed.$$scope || changed.tableToEdit) modal_changes.$$scope = { changed, ctx };
    			modal.$set(modal_changes);

    			if ((!current || changed.tableList) && t2_value !== (t2_value = ctx.tableList.length + "")) {
    				set_data_dev(t2, t2_value);
    			}

    			if (changed.tableList) {
    				each_value = ctx.tableList;

    				let i_1;
    				for (i_1 = 0; i_1 < each_value.length; i_1 += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i_1);

    					if (each_blocks[i_1]) {
    						each_blocks[i_1].p(changed, child_ctx);
    					} else {
    						each_blocks[i_1] = create_each_block(child_ctx);
    						each_blocks[i_1].c();
    						each_blocks[i_1].m(div5, null);
    					}
    				}

    				for (; i_1 < each_blocks.length; i_1 += 1) {
    					each_blocks[i_1].d(1);
    				}
    				each_blocks.length = each_value.length;
    			}

    			if (each_value.length) {
    				if (each_1_else) {
    					each_1_else.d(1);
    					each_1_else = null;
    				}
    			} else if (!each_1_else) {
    				each_1_else = create_else_block(ctx);
    				each_1_else.c();
    				each_1_else.m(div5, null);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(modal, detaching);

    			if (detaching) {
    				detach_dev(t0);
    				detach_dev(section);
    			}

    			destroy_each(each_blocks, detaching);

    			if (each_1_else) each_1_else.d();

    			dispose();
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$3.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	

      let openModal = false;
      let tableToEdit = {};

      const showForm = () => {
        $$invalidate('openModal', openModal = true);
      };

      const editItem = (obj, ev) => {
        $$invalidate('tableToEdit', tableToEdit = obj);
        showForm();
      };

      const removeItem = (id, ev) => {
        remove$1("restaurant-tables/", id).then(() => {
          getTables();
        });
      };

      const createItem = () => {
        $$invalidate('tableToEdit', tableToEdit = { id: 0, number: 0, busy: false });
        showForm();
      };

      const hideForm = () => {
        $$invalidate('openModal', openModal = false);
        getTables();
      };

      let tableList = [];

      const getTables = () => {
        getAll("restaurant-tables/").then(success => {
          $$invalidate('tableList', tableList = success);
        });
      };

      onMount(() => {
        getTables();
      });

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ('openModal' in $$props) $$invalidate('openModal', openModal = $$props.openModal);
    		if ('tableToEdit' in $$props) $$invalidate('tableToEdit', tableToEdit = $$props.tableToEdit);
    		if ('tableList' in $$props) $$invalidate('tableList', tableList = $$props.tableList);
    	};

    	return {
    		openModal,
    		tableToEdit,
    		editItem,
    		removeItem,
    		createItem,
    		hideForm,
    		tableList
    	};
    }

    class TableList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$3, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "TableList", options, id: create_fragment$3.name });
    	}
    }

    /* src/App.svelte generated by Svelte v3.12.1 */

    const file$4 = "src/App.svelte";

    function create_fragment$4(ctx) {
    	var t, section, current;

    	var header = new Header({ $$inline: true });

    	var tablelist = new TableList({ $$inline: true });

    	const block = {
    		c: function create() {
    			header.$$.fragment.c();
    			t = space();
    			section = element("section");
    			tablelist.$$.fragment.c();
    			attr_dev(section, "id", "dashboard");
    			attr_dev(section, "class", "centralizado svelte-kvfky3");
    			add_location(section, file$4, 14, 0, 263);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, section, anchor);
    			mount_component(tablelist, section, null);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);

    			transition_in(tablelist.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(tablelist.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(header, detaching);

    			if (detaching) {
    				detach_dev(t);
    				detach_dev(section);
    			}

    			destroy_component(tablelist);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$4.name, type: "component", source: "", ctx });
    	return block;
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$4, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "App", options, id: create_fragment$4.name });
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
