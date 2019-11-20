/*
 * Copyright 2019 Hans-Kristian Arntzen for Valve Corporation
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301, USA
 */

#pragma once

#include "dxil_parser.hpp"
#include "llvm_bitcode_parser.hpp"
#include "spirv_module.hpp"
#include "cfg_structurizer.hpp"
#include "node_pool.hpp"
#include <memory>

namespace DXIL2SPIRV
{
struct ConvertedFunction
{
	CFGNode *entry;
	std::unique_ptr<CFGNodePool> node_pool;
};

class Converter
{
public:
	Converter(DXILContainerParser container_parser, LLVMBCParser bitcode_parser, SPIRVModule &module);
	~Converter();
	ConvertedFunction convert_entry_point();

private:
	struct Impl;
	std::unique_ptr<Impl> impl;
};
} // namespace DXIL2SPIRV