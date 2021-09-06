import { DocBlock } from "../Parser/Tags";
import { get_multiple, get_unique } from "../../utils/functions";

export interface FunctionParameters {
	name: string;
	type: string;
	description: string;
}

export interface FunctionReferences {
	name: string;
	path: string;
}

export interface FunctionReturns {
	type: string;
	description: string;
}

export default class FunctionPage {
	readonly item: string;
	readonly parameters?: FunctionParameters[];
	readonly returns?: FunctionReturns[];
	readonly examples?: string[];
	readonly realm?: string;
	readonly internal?: boolean;
	readonly warnings?: string[];
	readonly references?: FunctionReferences[];

	constructor(
		public readonly name: string,
		public readonly description?: string,
		block: DocBlock = {}
	) {
		const params: FunctionParameters[] = get_multiple(block, "tparam").map(
			param => ({
				type: param[0],
				name: param[1],
				description: param[2],
			})
		);
		this.parameters = params.length > 0 ? params : undefined;
		const returns: FunctionReturns[] = get_multiple(block, "treturn").map(
			ret => ({
				type: ret[0],
				description: ret[1],
			})
		);
		this.returns = returns.length > 0 ? returns : undefined;
		const examples: string[] = get_multiple(block, "example").map(
			example => example[0]
		);
		this.examples = examples.length > 0 ? examples : undefined;
		this.realm = get_unique(block, "realm")
		this.internal =
			get_unique(block, "internal") === "true"
			? true
			: undefined;

		const warnings: string[] = get_multiple(block, "warn").map(
			reference => reference[0]
		);
		this.warnings = warnings.length > 0 ? warnings : undefined;

		const references: FunctionReferences[] = get_multiple(block, "see").map(
			warn => ({
					name: warn[0],
					path: warn[1]
				})
		);
		this.references = references.length > 0 ? references : undefined;
		
		this.item = "function";
	}

	print(level: number = 0) {
		console.log("    ".repeat(level) + this.name);
	}
}
