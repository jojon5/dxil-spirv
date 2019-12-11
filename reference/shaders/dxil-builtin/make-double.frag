#version 460

layout(location = 0) flat in uvec2 VALUE;
layout(location = 0) out float SV_Target;

void main()
{
    SV_Target = float(packDouble2x32(uvec2(VALUE.x, VALUE.y)));
}


#if 0
// LLVM disassembly
target datalayout = "e-m:e-p:32:32-i1:32-i8:32-i16:32-i32:32-i64:64-f16:32-f32:32-f64:64-n8:16:32:64"
target triple = "dxil-ms-dx"

define void @main() {
  %1 = call i32 @dx.op.loadInput.i32(i32 4, i32 0, i32 0, i8 0, i32 undef)
  %2 = call i32 @dx.op.loadInput.i32(i32 4, i32 0, i32 0, i8 1, i32 undef)
  %3 = call double @dx.op.makeDouble.f64(i32 101, i32 %1, i32 %2)
  %4 = fptrunc double %3 to float
  call void @dx.op.storeOutput.f32(i32 5, i32 0, i32 0, i8 0, float %4)
  ret void
}

; Function Attrs: nounwind readnone
declare i32 @dx.op.loadInput.i32(i32, i32, i32, i8, i32) #0

; Function Attrs: nounwind
declare void @dx.op.storeOutput.f32(i32, i32, i32, i8, float) #1

; Function Attrs: nounwind readnone
declare double @dx.op.makeDouble.f64(i32, i32, i32) #0

attributes #0 = { nounwind readnone }
attributes #1 = { nounwind }

!llvm.ident = !{!0}
!dx.version = !{!1}
!dx.valver = !{!2}
!dx.shaderModel = !{!3}
!dx.viewIdState = !{!4}
!dx.entryPoints = !{!5}

!0 = !{!"clang version 3.7 (tags/RELEASE_370/final)"}
!1 = !{i32 1, i32 0}
!2 = !{i32 1, i32 5}
!3 = !{!"ps", i32 6, i32 0}
!4 = !{[4 x i32] [i32 2, i32 1, i32 1, i32 1]}
!5 = !{void ()* @main, !"main", !6, null, !14}
!6 = !{!7, !11, null}
!7 = !{!8}
!8 = !{i32 0, !"VALUE", i8 5, i8 0, !9, i8 1, i32 1, i8 2, i32 0, i8 0, !10}
!9 = !{i32 0}
!10 = !{i32 3, i32 3}
!11 = !{!12}
!12 = !{i32 0, !"SV_Target", i8 9, i8 16, !9, i8 0, i32 1, i8 1, i32 0, i8 0, !13}
!13 = !{i32 3, i32 1}
!14 = !{i32 0, i64 4}
#endif
#if 0
// SPIR-V disassembly
; SPIR-V
; Version: 1.3
; Generator: Unknown(30017); 21022
; Bound: 26
; Schema: 0
OpCapability Shader
OpCapability Float64
%19 = OpExtInstImport "GLSL.std.450"
OpMemoryModel Logical GLSL450
OpEntryPoint Fragment %3 "main" %8 %11
OpExecutionMode %3 OriginUpperLeft
OpName %3 "main"
OpName %8 "VALUE"
OpName %11 "SV_Target"
OpDecorate %8 Flat
OpDecorate %8 Location 0
OpDecorate %11 Location 0
%1 = OpTypeVoid
%2 = OpTypeFunction %1
%5 = OpTypeInt 32 0
%6 = OpTypeVector %5 2
%7 = OpTypePointer Input %6
%8 = OpVariable %7 Input
%9 = OpTypeFloat 32
%10 = OpTypePointer Output %9
%11 = OpVariable %10 Output
%12 = OpTypePointer Input %5
%14 = OpConstant %5 0
%17 = OpConstant %5 1
%20 = OpTypeFloat 64
%3 = OpFunction %1 None %2
%4 = OpLabel
OpBranch %24
%24 = OpLabel
%13 = OpAccessChain %12 %8 %14
%15 = OpLoad %5 %13
%16 = OpAccessChain %12 %8 %17
%18 = OpLoad %5 %16
%22 = OpCompositeConstruct %6 %15 %18
%21 = OpExtInst %20 %19 PackDouble2x32 %22
%23 = OpFConvert %9 %21
OpStore %11 %23
OpReturn
OpFunctionEnd
#endif